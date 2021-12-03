from flask import abort
from flask_restx import Resource, Namespace, Model, fields, reqparse
from infraestructura.alumno_materia_repo import AlumnoMateriaRepo
from api.alumnos_api import modeloAlumno
from api.cursos_api import modeloCurso
from flask_restx.inputs import date

repo = AlumnoMateriaRepo()

nsAlumnoMateria = Namespace('AlumnoMateria', description= 'Administrador de Alumnos-materias')
modeloAlumnoMateriaSinNum = Model('DetalleSinNumero',{
    'curso_id': fields.Integer(),
    'alumno_id': fields.Integer()
})

modeloAlumnoMateria = modeloAlumnoMateriaSinNum.clone('AlumnoMateria', {
    'id': fields.Integer(),
    'curso': fields.Nested(modeloCurso, skip_none=True),
    'alumno': fields.Nested(modeloAlumno, skip_none=True)
})
modeloBusqueda = Model('BusquedaFechas', {
    'desde': fields.Date(),
    'hasta': fields.Date()
})
nsAlumnoMateria.models[modeloAlumnoMateriaSinNum.name] = modeloAlumnoMateriaSinNum
nsAlumnoMateria.models[modeloAlumnoMateria.name] = modeloAlumnoMateria
nsAlumnoMateria.models[modeloBusqueda.name] = modeloBusqueda


nuevoAlumnoMateriaParser = reqparse.RequestParser(bundle_errors=True)
nuevoAlumnoMateriaParser.add_argument('curso_id', type=int, required=True)
nuevoAlumnoMateriaParser.add_argument('alumno_id', type=int, required=True)


editarAlumnoMateriaParser = nuevoAlumnoMateriaParser.copy()
editarAlumnoMateriaParser.add_argument('id', type=int, required=True)
buscarAlumnoMateriaParser = reqparse.RequestParser(bundle_errors=True)
buscarAlumnoMateriaParser.add_argument('desde', type=date, required=True)
buscarAlumnoMateriaParser.add_argument('hasta', type=date, required=True)
@nsAlumnoMateria.route('/')
class AlumnoMateriaResource(Resource):
    @nsAlumnoMateria.marshal_list_with(modeloAlumnoMateria)
    def get(self):
        return repo.get_all()

    @nsAlumnoMateria.expect(modeloAlumnoMateriaSinNum)
    @nsAlumnoMateria.marshal_with(modeloAlumnoMateria)
    def post(self):
        data = nuevoAlumnoMateriaParser.parse_args()
        df = repo.agregar(data)
        if df:
            return df, 201
        abort(500)

@nsAlumnoMateria.route('/<int:alumno>')
class AlumnoMateriaResource(Resource):
    @nsAlumnoMateria.marshal_list_with(modeloAlumnoMateria)
    def get(self, alumno):
        return repo.get_all(alumno)

@nsAlumnoMateria.route('/<int:alumno>/<int:id>')
class AlumnoMateriaResource(Resource):
    @nsAlumnoMateria.marshal_with(modeloAlumnoMateria)
    def get(self, id):
        df = repo.get_by_id(id)
        if df:
            return df, 200
        abort(400)
   
    @nsAlumnoMateria.expect(modeloAlumnoMateria)
    def put(self, id):
        data = editarAlumnoMateriaParser.parse_args()
        if repo.modificar(id,data):
            return 'Relacion alumno-materia modificada', 200
        abort(404)
@nsAlumnoMateria.route('/baja/<int:id>')
class AlumnoMateriaResource(Resource):
    @nsAlumnoMateria.expect(modeloAlumnoMateria)

    def put(self, id):
        if repo.baja(id):
            repoAlumnoMateria.baja(id)
            return 'Relacion alumno-materia eliminada', 200            
        abort(400)
@nsAlumnoMateria.route('/buscar/<string:desde>/<string:hasta>/<int:id>')
class AlumnoMateriaResource(Resource):
    @nsAlumnoMateria.marshal_list_with(modeloAlumnoMateria)
    def get(self, desde, hasta,id):
        l = repoAlumnoMateria.buscar(id)
        if l:
            
             a= []
             for x in l:
               h= repo.buscar(x.id,desde,hasta)
            
             a.append(h)
             return a, 200
        abort(404)
@nsAlumnoMateria.route('/buscar/<string:desde>/<string:hasta>')
class AlumnoMateriaResource(Resource):
    @nsAlumnoMateria.marshal_list_with(modeloAlumnoMateria)
    def get(self, desde, hasta):
        l = repo.buscar(desde,hasta)
        if l:
          return l,200
        abort(404)