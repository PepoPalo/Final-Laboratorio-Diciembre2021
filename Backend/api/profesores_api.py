from flask import abort
from flask_restx import Resource, Namespace, Model, fields, reqparse
from infraestructura.profesores_repo import ProfesoresRepo
from flask_restx.inputs import date


repo = ProfesoresRepo()

nsProfesor = Namespace('Profesores', description='Administrador de Profesores')

modeloProfesorSinID = Model('ProfesorSinCod',{
    'nombre': fields.String(),
    'titulo': fields.String(),
    'direccion': fields.String(),
    'fecha_baja'  : fields.Date() 
})

modeloProfesor = modeloProfesorSinID.clone('Profesor',{
    'id': fields.Integer()

})

nsProfesor.models[modeloProfesor.name] = modeloProfesor
nsProfesor.models[modeloProfesorSinID.name] = modeloProfesorSinID

nuevoProfesorParser = reqparse.RequestParser(bundle_errors=True)
nuevoProfesorParser.add_argument('nombre', type=str, required=True)
nuevoProfesorParser.add_argument('titulo', type=str, required=True)
nuevoProfesorParser.add_argument('direccion', type=str, required=True)
nuevoProfesorParser.add_argument('fecha_baja', type=date, required=False)


editarProfesorParser = nuevoProfesorParser.copy()
editarProfesorParser.add_argument('id',type=int, required=True)

@nsProfesor.route('/')
class ProfesorResource(Resource):
    @nsProfesor.marshal_list_with(modeloProfesor)
    def get(self):
        return repo.get_all()

    @nsProfesor.expect(modeloProfesorSinID)
    @nsProfesor.marshal_with(modeloProfesor)
    def post(self):
        data = nuevoProfesorParser.parse_args()
        p = repo.agregar(data)
        if p:
            return p, 200
        abort(500)

@nsProfesor.route('/<int:id>')
class ProfesorResource(Resource):
    @nsProfesor.marshal_with(modeloProfesor)
    def get(self, id):
        p = repo.get_by_id(id)
        if p:
            return p, 200
        abort(404)
    
    
    
    @nsProfesor.expect(modeloProfesor)
    def put(self, id):
        data = editarProfesorParser.parse_args()
        if repo.modificar(id,data):
            return 'Profesor actualizado', 200
        abort(404)

@nsProfesor.route('/baja/<int:id>')
class ProfesorResource(Resource):

     def put(self, id):
        if repo.baja(id):
          
            return 'Profesor dado de baja', 200
        abort(400)    

    