from flask import Flask
from flask_restx import Api
from flask_cors import CORS

from datos import db

from api.profesores_api import nsProfesor
from api.alumno_materia_api import nsAlumnoMateria
from api.cursos_api import nsCurso

from api.asistencia_api import nsAsistencia
from api.alumnos_api import nsAlumno
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://postgres:Yegua2020@localhost/Instituto"

CORS(app)
db.init_app(app)

with app.app_context():
    db.create_all()


api = Api(app, version='1.0.beta', title='Instituto', description='Administracion de Instituto de Enseñanza')


# api.add_namespace(nsAsistencia)
# api.add_namespace(nsAlumno)
# api.add_namespace(nsCurso)
api.add_namespace(nsProfesor) 

api.add_namespace(nsAlumnoMateria)

if __name__ == '__main__':
    app.run()