from flask import abort
from flask_restx import Resource, Namespace, Model, fields, reqparse
from infraestructura.cursos_repo import CursosRepo


from flask_restx.inputs import date

repo = CursosRepo()



nsCurso = Namespace('Cursos', description='Administrador de Cursos')

modeloCursoSinID = Model('CursoSinCod',{
    'nombre': fields.String(),
    'cupo_total': fields.Integer(),
    'fecha_ini': fields.Date(),
    'fecha_fin': fields.Date(),
    'id_prof_tit': fields.Integer(),
    'id_prof_adj': fields.Integer(),
    'fecha_baja': fields.Date()
})

modeloCurso = modeloCursoSinID.clone('Curso',{
    'id': fields.Integer(),

})
modeloBusqueda = Model('BusquedaFechas', {
    'desde': fields.Date(),
    'hasta': fields.Date()
})

nsCurso.models[modeloCurso.name] = modeloCurso
nsCurso.models[modeloCursoSinID.name] = modeloCursoSinID
nsCurso.models[modeloBusqueda.name] = modeloBusqueda

nuevoCursoParser = reqparse.RequestParser(bundle_errors=True)
nuevoCursoParser.add_argument('nombre', type=str, required=True)
nuevoCursoParser.add_argument('cupo_total', type=int, required=True)
nuevoCursoParser.add_argument('fecha_ini', type=date, required=True)
nuevoCursoParser.add_argument('fecha_fin', type=date, required=True)
nuevoCursoParser.add_argument('id_prof_tit', type=int, required=True)
nuevoCursoParser.add_argument('id_prof_adj', type=int, required=True)
nuevoCursoParser.add_argument('fecha_baja', type=date, required=False)




editarCursoParser = nuevoCursoParser.copy()
editarCursoParser.add_argument('id',type=int, required=True)


buscarCursosParser = reqparse.RequestParser(bundle_errors=True)
buscarCursosParser.add_argument('desde', type=str, required=True)
buscarCursosParser.add_argument('hasta', type=str, required=True)
@nsCurso.route('/')
class CursoResource(Resource):
    @nsCurso.marshal_list_with(modeloCurso)
    def get(self):
        return repo.get_all()

    @nsCurso.expect(modeloCursoSinID)
    @nsCurso.marshal_with(modeloCurso)
    def post(self):
        data = nuevoCursoParser.parse_args()
        p = repo.agregar(data)
        if p:
            return p, 200
        abort(500)
    @nsCurso.expect(modeloCurso)
    def put(self, id):
        data = editarCursoParser.parse_args()
        if repo.modificar(id,data):
            return 'Curso actualizado', 200
        abort(404)



@nsCurso.route('/<int:id>')
class CursoResource(Resource):
    @nsCurso.marshal_with(modeloCurso)
    def get(self, id):
        p = repo.get_by_id(id)
        if p:
            return p, 200
        abort(404)

    # def delete(self, id):
    #     if repo.baja(id):
    #         return 'Curso dado de baja', 200
    #     abort(400)    









   

@nsCurso.route('/buscar/<string:desde>/<string:hasta>/')
class CursoResource(Resource):
    @nsCurso.marshal_list_with(modeloCurso)
    def get(self, desde, hasta):
        l = repo.buscarPorFecha(desde, hasta)
        if l:
            return l, 200
        abort(404)

@nsCurso.route('/buscar/cursoalumno/<int:alumno>/')
class CursoResource(Resource):
    @nsCurso.marshal_list_with(modeloCurso)
    def get(self, alumno):
        l = repo.get_by_alumno(alumno)
        if l:
            return l, 200
        abort(404)

@nsCurso.route('/buscar/<int:profe_id>/')
class CursoResource(Resource):
    @nsCurso.marshal_list_with(modeloCurso)
    def get(self, profe_id):
        l = repo.get_by_titular(profe_id)
        if l:
            return l, 200
        abort(404)

@nsCurso.route('/baja/<int:id>')
class CursoResource(Resource):
    @nsCurso.marshal_with(modeloCurso)

    def put(self, id):
        if repo.baja(id):
          
            return 'Curso dado de Baja', 200            
        abort(400)
        

   