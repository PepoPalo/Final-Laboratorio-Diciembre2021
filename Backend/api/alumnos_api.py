from flask import abort
from flask_restx import Resource, Namespace, Model, fields, reqparse
from infraestructura.alumnos_repo import AlumnosRepo
from api.cursos_api import modeloCurso

from flask_restx.inputs import date

repo = AlumnosRepo()


nsAlumno = Namespace('Alumnos', description='Administrador de Alumno')

modeloAlumnoSinID = Model('AlumnoSinID',{
    'nombre': fields.String(),
    'direccion': fields.String(),
    'sexo':fields.String(),
    'edad':fields.Integer(),
    'fecha_baja': fields.Date()
    })

modeloAlumno = modeloAlumnoSinID.clone('Alumno',{
    'id': fields.Integer(),
    #'cursos': fields.Nested(modeloCurso, skip_none=True)
})

# modeloBusqueda = Model('BusquedaFechas', {
#     'desde': fields.Date(),
#     'hasta': fields.Date()
# })
nsAlumno.models[modeloAlumno.name] = modeloAlumno
nsAlumno.models[modeloAlumnoSinID.name] = modeloAlumnoSinID
# nsAlumno.models[modeloBusqueda.name] = modeloBusqueda

nuevoAlumnoParser = reqparse.RequestParser(bundle_errors=True)
nuevoAlumnoParser.add_argument('nombre', type=str, required=True)
nuevoAlumnoParser.add_argument('direccion', type=str, required=True)
nuevoAlumnoParser.add_argument('sexo', type=str, required=True)
nuevoAlumnoParser.add_argument('edad', type=int, required=True)
nuevoAlumnoParser.add_argument('fecha_baja', type=date, required=False)

editarAlumnoParser = nuevoAlumnoParser.copy()
editarAlumnoParser.add_argument('id', type=int, required=True)

@nsAlumno.route('/')
class AlumnosResource(Resource):
    # @nsAlumno.marshal_list_with(modeloAlumno)
    # def get(self):
    #     return repo.get_all()
    
    @nsAlumno.marshal_list_with(modeloAlumno)
    def get(self):
        return repo.get_all()

    @nsAlumno.expect(modeloAlumnoSinID)
    @nsAlumno.marshal_with(modeloAlumno)
    def post(self):
        data = nuevoAlumnoParser.parse_args()
        Alumno = repo.agregar(data)
        if Alumno:
            return Alumno, 201
        abort(500)

@nsAlumno.route('/<int:id>')
class AlumnoResource(Resource):
    @nsAlumno.marshal_with(modeloAlumno)
    def get(self, id):
        Alumno = repo.get_by_id(id)
        if Alumno:
            return Alumno, 200
        abort(404)

   

    @nsAlumno.expect(modeloAlumno)
    def put(self, id):
        data = editarAlumnoParser.parse_args()
        if repo.modificar(id, data):
            return 'Alumno actualizado', 200
        abort(404)

# @nsAlumno.route('/buscar/<string:desde>/<string:hasta>/')
# class AlumnoResource(Resource):
#     @nsAlumno.marshal_list_with(modeloAlumno)
#     def get(self, desde, hasta):
#         l = repoLep.buscar(desde, hasta)
#         if l:
#              a = []
#              for x in l:
#               h = repo.get_by_id(x.Alumno_id)
#              a.append(h)
#              return l, 200
#         abort(404)

@nsAlumno.route('/baja/<int:id>')
class AlumnoResource(Resource):
   
    def put(self, id):
        if repo.baja(id):
            return 'Alumno dado de baja', 200
        abort(400)    

@nsAlumno.route('/buscar/<int:curso>')
class AlumnoResource(Resource):
    @nsAlumno.marshal_list_with(modeloAlumno)
    def get(self, curso):
        l = repo.get_alumno_curso(curso)
        if l:
             
             return l, 200
        abort(404)

