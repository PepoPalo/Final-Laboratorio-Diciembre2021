from flask import abort
from flask_restx import Resource, Namespace, Model, fields, reqparse
from infraestructura.alumno_materia_repo import AlumnoMateriaRepo

from flask_restx.inputs import date

repo = AlumnoMateriaRepo()

nsAlumnoMateria = Namespace('AlumnoMateria', description= 'Administrador de linea-equipo-plan')
modeloAlumnoMateriaSinNum = Model('DetalleSinNumero',{
    'plan_id': fields.Integer(),
    'linea_id': fields.Integer(),
    'equipo_id': fields.Integer(),
    'fecha_ini': fields.Date(),
    'fecha_fin': fields.Date(),
    'plan_costo': fields.Float()
})

modeloAlumnoMateria = modeloAlumnoMateriaSinNum.clone('AlumnoMateria', {
    'id': fields.Integer()
})
modeloBusqueda = Model('BusquedaFechas', {
    'desde': fields.Date(),
    'hasta': fields.Date()
})
nsAlumnoMateria.models[modeloAlumnoMateriaSinNum.name] = modeloAlumnoMateriaSinNum
nsAlumnoMateria.models[modeloAlumnoMateria.name] = modeloAlumnoMateria
nsAlumnoMateria.models[modeloBusqueda.name] = modeloBusqueda


nuevoAlumnoMateriaParser = reqparse.RequestParser(bundle_errors=True)
nuevoAlumnoMateriaParser.add_argument('plan_id', type=int, required=True)
nuevoAlumnoMateriaParser.add_argument('linea_id', type=int, required=True)
nuevoAlumnoMateriaParser.add_argument('equipo_id', type=int, required=True)
nuevoAlumnoMateriaParser.add_argument('fecha_ini', type=date, required=True)
nuevoAlumnoMateriaParser.add_argument('fecha_fin', type=date, required=False)
nuevoAlumnoMateriaParser.add_argument('plan_costo', type=float, required=True)

editarAlumnoMateriaParser = nuevoAlumnoMateriaParser.copy()
editarAlumnoMateriaParser.add_argument('id', type=int, required=True)
buscarAlumnoMateriaParser = reqparse.RequestParser(bundle_errors=True)
buscarAlumnoMateriaParser.add_argument('desde', type=str, required=True)
buscarAlumnoMateriaParser.add_argument('hasta', type=str, required=True)
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

@nsAlumnoMateria.route('/<int:cliente>')
class AlumnoMateriaResource(Resource):
    @nsAlumnoMateria.marshal_list_with(modeloAlumnoMateria)
    def get(self, cliente):
        return repo.get_all(cliente)

@nsAlumnoMateria.route('/<int:cliente>/<int:id>')
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
            return 'Relacion linea-equipo-plan modificada', 200
        abort(404)
@nsAlumnoMateria.route('/baja/<int:id>')
class AlumnoMateriaResource(Resource):
    @nsAlumnoMateria.expect(modeloAlumnoMateria)

    def put(self, id):
        if repo.baja(id):
            #baja en cliente_AlumnoMateria           
            repoAlumnoMateria.bajaAlumnoMateria(id)
            return 'Relacion linea-equipo-plan dada de Baja', 200            
        abort(400)
@nsAlumnoMateria.route('/buscar/<string:desde>/<string:hasta>/<int:id>')
class AlumnoMateriaResource(Resource):
    @nsAlumnoMateria.marshal_list_with(modeloAlumnoMateria)
    def get(self, desde, hasta,id):
        l = repoAlumnoMateria.buscar_by_cliente(id)
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
        l = repo.traer_activos(desde,hasta)
        if l:
          return l,200
        abort(404)