from flask import abort
from flask_restx import Resource, Namespace, Model, fields, reqparse
from infraestructura.lineas_repo import LineasRepo
from infraestructura.equipos_repo import EquiposRepo
from infraestructura.clientes_lep_repo import ClientesLepRepo
from infraestructura.lineaequipoplan_repo import LineaEquipoPlanRepo
repoLep= LineaEquipoPlanRepo()
repoLepCliente = ClientesLepRepo()
repo = LineasRepo()
repoEquipo = EquiposRepo()
nsLinea = Namespace('lineas', description='Administrador de lineas')
modeloLineaSinN = Model('LineaSinNumero',{
    'numero': fields.String(),
    'estado': fields.String(),
    'activa': fields.Boolean()
})

modeloLinea = modeloLineaSinN.clone('Linea', {
    'id': fields.Integer()
})

modeloBusqueda = Model('BusquedaFechas', {
    'desde': fields.Date(),
    'hasta': fields.Date()
})

nsLinea.models[modeloLinea.name] = modeloLinea
nsLinea.models[modeloLineaSinN.name] = modeloLineaSinN
nsLinea.models[modeloBusqueda.name] = modeloBusqueda

nuevaLineaParser = reqparse.RequestParser(bundle_errors=True)
nuevaLineaParser.add_argument('numero', type=str, required=True)
nuevaLineaParser.add_argument('estado', type=str, required=True)
        ##PEDRO LOOK AT THIS
        ##PEDRO LOOK AT THIS

nuevaLineaParser.add_argument('activa', type=bool, required=False)

editarLineaParser = nuevaLineaParser.copy()
editarLineaParser.add_argument('id', type=int, required=True)

buscarLineasParser = reqparse.RequestParser(bundle_errors=True)
buscarLineasParser.add_argument('desde', type=str, required=True)
buscarLineasParser.add_argument('hasta', type=str, required=True)


@nsLinea.route('/')
class LineasResource(Resource):
    @nsLinea.marshal_list_with(modeloLinea)
    def get(self):
        return repo.get_all()

    @nsLinea.expect(modeloLineaSinN)
    @nsLinea.marshal_with(modeloLinea)
    def post(self):
        data = nuevaLineaParser.parse_args()

        ##PEDRO LOOK AT THIS
        if(data.estado =="Activada"):
            data.activa = True
        else:
            data.activa = False

        f = repo.agregar(data)
        if f:
            return f, 201
        abort(500)

@nsLinea.route('/<int:id>')
class LineasResource(Resource):
    @nsLinea.marshal_with(modeloLinea)
    def get(self, id):
        f = repo.get_by_numero(id)
        if f:
            return f, 200
        abort(404)

   
    
    @nsLinea.expect(modeloLinea)
    def put(self, id):
        data = editarLineaParser.parse_args()
        if repo.modificar(id, data):
            return 'Linea modificada', 200
        abort(404)
@nsLinea.route('/baja/<int:id>')
class LineasResource(Resource):

     def put(self, id):
        if repo.baja(id):
            # doy de baja en lineaEquipoPlan

            # repoLep.baja_by_linea(id)

            # # busco  para darle de baja al equipo 
            # # y tener tmb el id pa la tabla cliente_lep
            # lineaeqplan = repoLep.buscar_by_linea(id)

            # #doy de baja el equipo
            # repoEquipo.baja(lineaeqplan.equipo_id)
            # #doy de baja en tabla cliente_lep
            # repoLepCliente.bajalep(lineaeqplan.id)

            return 'Linea dada de baja', 200
        abort(400)    

