from flask import abort
from flask_restx import Resource, Namespace, Model, fields, reqparse
from infraestructura.planes_repo import PlanesRepo

repo = PlanesRepo()

nsPlan = Namespace('planes', description='Administrador de planes')

modeloPlanSinID = Model('PlanSinCod',{
    'nombre': fields.String(),
    'costo_por_mes': fields.Float(),
    'cant_llamadas': fields.Integer(),
    'cant_mensajes': fields.Integer(),
    'cant_gigas': fields.Integer(),
    'tipo': fields.String(),
    'estaActivo': fields.Boolean()
})

modeloPlan = modeloPlanSinID.clone('Plan',{
    'id': fields.Integer(),

})

nsPlan.models[modeloPlan.name] = modeloPlan
nsPlan.models[modeloPlanSinID.name] = modeloPlanSinID

nuevoPlanParser = reqparse.RequestParser(bundle_errors=True)
nuevoPlanParser.add_argument('nombre', type=str, required=True)
nuevoPlanParser.add_argument('costo_por_mes', type=float)
nuevoPlanParser.add_argument('cant_llamadas', type=int)
nuevoPlanParser.add_argument('cant_mensajes', type=int)
nuevoPlanParser.add_argument('cant_gigas', type=int)
nuevoPlanParser.add_argument('tipo', type=str, required=True)
nuevoPlanParser.add_argument('estaActivo', type=bool, required=True)

editarPlanParser = nuevoPlanParser.copy()
editarPlanParser.add_argument('id',type=int, required=True)

@nsPlan.route('/')
class PlanResource(Resource):
    @nsPlan.marshal_list_with(modeloPlan)
    def get(self):
        return repo.get_all()

    @nsPlan.expect(modeloPlanSinID)
    @nsPlan.marshal_with(modeloPlan)
    def post(self):
        data = nuevoPlanParser.parse_args()
        p = repo.agregar(data)
        if p:
            return p, 200
        abort(500)

@nsPlan.route('/<int:id>')
class PlanResource(Resource):
    @nsPlan.marshal_with(modeloPlan)
    def get(self, id):
        p = repo.get_by_id(id)
        if p:
            return p, 200
        abort(404)
    
    
    
    @nsPlan.expect(modeloPlan)
    def put(self, id):
        data = editarPlanParser.parse_args()
        if repo.modificar(id,data):
            return 'Plan actualizado', 200
        abort(404)

@nsPlan.route('/baja/<int:id>')
class PlanResource(Resource):

     def put(self, id):
        if repo.baja(id):
          
            return 'Linea dada de baja', 200
        abort(400)    

    