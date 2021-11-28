from flask import abort
from flask_restx import Resource, Namespace, Model, fields, reqparse
from infraestructura.equipos_repo import EquiposRepo
from infraestructura.clientes_lep_repo import ClientesLepRepo
from infraestructura.lineaequipoplan_repo import LineaEquipoPlanRepo

from flask_restx.inputs import date

repo = EquiposRepo()
repoLepCliente = ClientesLepRepo()
repoLep= LineaEquipoPlanRepo()


nsEquipo = Namespace('equipos', description='Administrador de equipos')

modeloEquipoSinID = Model('EquipoSinCod',{
    'marca': fields.String(),
    'modelo': fields.String(),
    'estado': fields.String(),
    'fecha_ingreso': fields.Date(),
    'activo': fields.Boolean()
})

modeloEquipo = modeloEquipoSinID.clone('Equipo',{
    'imei': fields.Integer(),

})
modeloBusqueda = Model('BusquedaFechas', {
    'desde': fields.Date(),
    'hasta': fields.Date()
})

nsEquipo.models[modeloEquipo.name] = modeloEquipo
nsEquipo.models[modeloEquipoSinID.name] = modeloEquipoSinID
nsEquipo.models[modeloBusqueda.name] = modeloBusqueda

nuevoEquipoParser = reqparse.RequestParser(bundle_errors=True)
nuevoEquipoParser.add_argument('marca', type=str, required=True)
nuevoEquipoParser.add_argument('modelo', type=str, required=True)
nuevoEquipoParser.add_argument('estado', type=str, required=True)
nuevoEquipoParser.add_argument('fecha_ingreso', type=date, required=True)
nuevoEquipoParser.add_argument('activo', type=bool, required=False, default=True)

editarEquipoParser = nuevoEquipoParser.copy()
editarEquipoParser.add_argument('imei',type=int, required=True)


buscarEquiposParser = reqparse.RequestParser(bundle_errors=True)
buscarEquiposParser.add_argument('desde', type=str, required=True)
buscarEquiposParser.add_argument('hasta', type=str, required=True)
@nsEquipo.route('/')
class EquipoResource(Resource):
    @nsEquipo.marshal_list_with(modeloEquipo)
    def get(self):
        return repo.get_all()

    @nsEquipo.expect(modeloEquipoSinID)
    @nsEquipo.marshal_with(modeloEquipo)
    def post(self):
        data = nuevoEquipoParser.parse_args()
        p = repo.agregar(data)
        if p:
            return p, 200
        abort(500)

@nsEquipo.route('/<int:id>')
class EquipoResource(Resource):
    @nsEquipo.marshal_with(modeloEquipo)
    def get(self, id):
        p = repo.get_by_id(id)
        if p:
            return p, 200
        abort(404)
    
    
    
    @nsEquipo.expect(modeloEquipo)
    def put(self, id):
        data = editarEquipoParser.parse_args()
        if repo.modificar(id,data):
            return 'Equipo actualizado', 200
        abort(404)
   

@nsEquipo.route('/buscar/<string:desde>/<string:hasta>/')
class EquipoResource(Resource):
    @nsEquipo.marshal_list_with(modeloEquipo)
    def get(self, desde, hasta):
        l = repo.buscar(desde, hasta)
        if l:
            return l, 200
        abort(404)
@nsEquipo.route('/baja/<int:id>')
class EquipoResource(Resource):
    @nsEquipo.expect(modeloEquipo)

    def put(self, id):
        if repo.baja(id):
            #baja en linea equipo plan
            repoLep.baja_by_equipo(id)
            #busco pa dar de baja en cliente-lep
            lep =repoLep.buscar_by_equipo(id)
            #baja en cliente-lep
            if lep:
             repoLepCliente.bajalep(lep.id)
            return 'Equipo dado de Baja', 200            
        abort(400)
        