from flask import abort
from flask_restx import Resource, Namespace, Model, fields, reqparse
from flask_restx.inputs import date
from api.cursos_api import modeloCurso

from infraestructura.asistencia_repo import AsistenciaRepo



repo = AsistenciaRepo()


nsAsistencia  = Namespace('Asistencias', description='Administrador de Asistencia ')
modeloAsistenciaSinN = Model('AsistenciaSinId',{
    
    'alumno_id': fields.Integer(),
    'curso_id': fields.Integer(),
    'fecha': fields.Date(),
    'fecha_baja':fields.Date(),
    'presente': fields.Boolean()
})

modeloAsistencia  = modeloAsistenciaSinN.clone('Asistencia', {
    'id': fields.Integer(),
    'cursos': fields.Nested(modeloCurso, skip_none=True)

})

modeloBusqueda = Model('BusquedaFechas', {
    'desde': fields.Date(),
    'hasta': fields.Date()
})

nsAsistencia.models[modeloAsistencia.name] = modeloAsistencia 
nsAsistencia.models[modeloAsistenciaSinN.name] = modeloAsistenciaSinN
nsAsistencia.models[modeloBusqueda.name] = modeloBusqueda
nuevaAsistenciaParser = reqparse.RequestParser(bundle_errors=True)
nuevaAsistenciaParser.add_argument('alumno_id', type=int, required=True)
nuevaAsistenciaParser.add_argument('curso_id', type=int, required=True)
nuevaAsistenciaParser.add_argument('fecha', type=date, required=False)
nuevaAsistenciaParser.add_argument('fecha_baja', type=date, required=False)
nuevaAsistenciaParser.add_argument('presente', type=bool, required=True)


editarAsistenciaParser = nuevaAsistenciaParser.copy()
editarAsistenciaParser.add_argument('id', type=int, required=True)

buscarAsistenciaParser = reqparse.RequestParser(bundle_errors=True)
buscarAsistenciaParser.add_argument('desde', type=str, required=True)
buscarAsistenciaParser.add_argument('hasta', type=str, required=True)

@nsAsistencia.route('/')
class AsistenciaResource(Resource):
    @nsAsistencia .marshal_list_with(modeloAsistencia )
    def get(self):
        return repo.get_all()

    @nsAsistencia.expect(modeloAsistenciaSinN)
    @nsAsistencia.marshal_with(modeloAsistencia)
    def post(self):
        data = nuevaAsistenciaParser.parse_args()
        f = repo.agregar(data)
        if f:
            return f, 201
        abort(500)
@nsAsistencia .route('/asistencia/curso/<int:curso>')
class AsistenciasResource(Resource):
    @nsAsistencia .marshal_with(modeloAsistencia )
    def get(self, curso):
        f = repo.buscarPorCurso(curso)
        if f:
            return f, 200
        abort(404)
@nsAsistencia .route('/asistencia/alumno/<int:alumno>')
class AsistenciasResource(Resource):
    @nsAsistencia .marshal_with(modeloAsistencia )
    def get(self, alumno):
        f = repo.buscarPorAlumno(alumno)
        if f:
            return f, 200
        abort(404)

    # def delete(self, numero):
    #     if repo.borrar(numero):
    #         return 'Asistencia  borrada', 200
    #     abort(400)
    
    @nsAsistencia.expect(modeloAsistencia )
    def put(self, numero):      
        data = editarAsistenciaParser.parse_args()
        if repo.modificar(numero, data):
            return 'Asistencia  modificada', 200
        abort(404)

@nsAsistencia.route('/buscarcurso/curso/<string:desde>/<string:hasta>/<int:curso>')
class AsistenciasResource(Resource):
    @nsAsistencia.marshal_list_with(modeloAsistencia )
    def get(self, desde, hasta, curso):
        l = repo.buscarFechaCurso(desde, hasta,curso)
        if l:
         return l, 200
        abort(404)
@nsAsistencia.route('/buscar/alumno/<string:desde>/<string:hasta>/<int:alumno>')
class AsistenciasResource(Resource):
    @nsAsistencia.marshal_list_with(modeloAsistencia )
    def get(self, desde, hasta, alumno):
        l = repo.buscarFechaAlumno(desde, hasta,alumno)
        if l:
         return l, 200
        abort(404)