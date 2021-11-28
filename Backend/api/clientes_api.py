from flask import abort
from flask_restx import Resource, Namespace, Model, fields, reqparse
from infraestructura.clientes_repo import ClientesRepo
from infraestructura.clientes_lep_repo import ClientesLepRepo
from infraestructura.lineaequipoplan_repo import LineaEquipoPlanRepo

from flask_restx.inputs import date

repo = ClientesRepo()
repo2 = LineaEquipoPlanRepo()
repoLep = ClientesLepRepo()

nsCliente = Namespace('clientes', description='Administrador de cliente')

modeloClienteSinID = Model('ClienteSinID',{
    'nombre': fields.String(),
    'direccion': fields.String(),
    'sexo':fields.String(),
    'edad':fields.Integer(),
    'fecha_ingreso':fields.Date(),
    'activo':fields.Boolean()
})

modeloCliente = modeloClienteSinID.clone('Cliente',{
    'id': fields.Integer()
})

modeloBusqueda = Model('BusquedaFechas', {
    'desde': fields.Date(),
    'hasta': fields.Date()
})
nsCliente.models[modeloCliente.name] = modeloCliente
nsCliente.models[modeloClienteSinID.name] = modeloClienteSinID
nsCliente.models[modeloBusqueda.name] = modeloBusqueda

nuevoClienteParser = reqparse.RequestParser(bundle_errors=True)
nuevoClienteParser.add_argument('nombre', type=str, required=True)
nuevoClienteParser.add_argument('direccion', type=str, required=True)
nuevoClienteParser.add_argument('sexo', type=str, required=True)
nuevoClienteParser.add_argument('fecha_ingreso', type=date, required=True)
nuevoClienteParser.add_argument('edad', type=int, required=True)
nuevoClienteParser.add_argument('activo', type=bool, required=True)

editarClienteParser = nuevoClienteParser.copy()
editarClienteParser.add_argument('id', type=int, required=True)

@nsCliente.route('/')
class ClientesResource(Resource):
    @nsCliente.marshal_list_with(modeloCliente)
    def get(self):
        return repo.get_all()
    
    
    @nsCliente.expect(modeloClienteSinID)
    @nsCliente.marshal_with(modeloCliente)
    def post(self):
        data = nuevoClienteParser.parse_args()
        cliente = repo.agregar(data)
        if cliente:
            return cliente, 201
        abort(500)

@nsCliente.route('/<int:id>')
class ClienteResource(Resource):
    @nsCliente.marshal_with(modeloCliente)
    def get(self, id):
        cliente = repo.get_by_id(id)
        if cliente:
            return cliente, 200
        abort(404)

   

    @nsCliente.expect(modeloCliente)
    def put(self, id):
        data = editarClienteParser.parse_args()
        if repo.modificar(id, data):
            return 'Cliente actualizado', 200
        abort(404)

@nsCliente.route('/buscar/<string:desde>/<string:hasta>/')
class ClienteResource(Resource):
    @nsCliente.marshal_list_with(modeloCliente)
    def get(self, desde, hasta):
        l = repoLep.buscar(desde, hasta)
        if l:
             a = []
             for x in l:
              h = repo.get_by_id(x.cliente_id)
             a.append(h)
             return l, 200
        abort(404)

@nsCliente.route('/baja/<int:id>')
class ClienteResource(Resource):
    @nsCliente.expect(modeloCliente)
    def put(self, id):
        if repo.baja(id):
            # doy de baja en la tabla relacional
            repoLep.bajacliente(id)
            return 'Cliente dado de baja', 200
        abort(400)    