from flask import abort
from flask_restx import Resource, Namespace, Model, fields, reqparse
from infraestructura.clientes_lep_repo import ClientesLepRepo
from infraestructura.lineaequipoplan_repo import LineaEquipoPlanRepo


repo = ClientesLepRepo()
lepRepo = LineaEquipoPlanRepo()

nsclienteLEP = Namespace('clienteLEPs', description='Administrador de Cliente ft Linea-Equipo-Plan')
modeloclienteLEPSinN = Model('clienteLEPSinId',{
    'cliente_id': fields.Integer(),
    'lep_id': fields.Integer(),
    'activo': fields.Boolean()
})

modeloclienteLEP = modeloclienteLEPSinN.clone('clienteLEP', {
    'id': fields.Integer()
})

modeloBusqueda = Model('BusquedaFechas', {
    'desde': fields.Date(),
    'hasta': fields.Date()
})

nsclienteLEP.models[modeloclienteLEP.name] = modeloclienteLEP
nsclienteLEP.models[modeloclienteLEPSinN.name] = modeloclienteLEPSinN
nsclienteLEP.models[modeloBusqueda.name] = modeloBusqueda
nuevaclienteLEPParser = reqparse.RequestParser(bundle_errors=True)
nuevaclienteLEPParser.add_argument('lep_id', type=int, required=True)
nuevaclienteLEPParser.add_argument('cliente_id', type=int, required=True)
nuevaclienteLEPParser.add_argument('activo', type=bool, required=False)

editarclienteLEPParser = nuevaclienteLEPParser.copy()
editarclienteLEPParser.add_argument('id', type=int, required=True)

buscarclienteLEPParser = reqparse.RequestParser(bundle_errors=True)
buscarclienteLEPParser.add_argument('desde', type=str, required=True)
buscarclienteLEPParser.add_argument('hasta', type=str, required=True)

@nsclienteLEP.route('/')
class clienteLEPResource(Resource):
    @nsclienteLEP.marshal_list_with(modeloclienteLEP)
    def get(self):
        return repo.get_all()

    @nsclienteLEP.expect(modeloclienteLEPSinN)
    @nsclienteLEP.marshal_with(modeloclienteLEP)
    def post(self):
        data = nuevaclienteLEPParser.parse_args()
        f = repo.agregar(data)
        if f:
            return f, 201
        abort(500)

@nsclienteLEP.route('/<int:numero>')
class clienteLEPsResource(Resource):
    @nsclienteLEP.marshal_with(modeloclienteLEP)
    def get(self, numero):
        f = repo.get_by_numero(numero)
        if f:
            return f, 200
        abort(404)

    def delete(self, numero):
        if repo.borrar(numero):
            return 'clienteLEP borrada', 200
        abort(400)
    
    @nsclienteLEP.expect(modeloclienteLEP)
    def put(self, numero):
        data = editarclienteLEPParser.parse_args()
        if repo.modificar(numero, data):
            return 'clienteLEP modificada', 200
        abort(404)

@nsclienteLEP.route('/buscar/<string:desde>/<string:hasta>/<int:cliente>')
class clienteLEPsResource(Resource):
    @nsclienteLEP.marshal_list_with(modeloclienteLEP)
    def get(self, desde, hasta, cliente):
        l = repo.buscar_by_cliente(cliente)
        if l:
            a= []
            for x in l:
               h= lepRepo.get_by_id(x)
               a.append(h)

            return a, 200
        abort(404)