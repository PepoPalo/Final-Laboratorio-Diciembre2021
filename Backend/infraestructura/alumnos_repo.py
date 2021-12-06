from datetime import datetime
from sqlalchemy.orm import query
from sqlalchemy.sql.elements import Null
from sqlalchemy.sql.expression import null
from dominio.alumnomateria import AlumnoMateria
from dominio.curso import Curso
from dominio.alumno import Alumno
from datos import db


class AlumnosRepo():
    def get_all(self):
        return Alumno.query.filter(Alumno.fecha_baja.is_(None)).all()

    def agregar(self, data):
        e = Alumno(**data)
        db.session.add(e)
        db.session.commit()
        return e
    
    def get_by_id(self, id):
        respuesta = db.session.query(Alumno).select_from(Alumno).join(AlumnoMateria).join(Curso).filter( Alumno.id==id).all()
        print (respuesta)
        #  filter( Alumno.id==AlumnoMateria.alumno_id, AlumnoMateria.curso_id==Curso.id).
        return respuesta
    def get_alumno_curso(self, curso):
        respuesta = db.session.query(Alumno).select_from(Alumno).join(AlumnoMateria).join(Curso).filter( Alumno.id==AlumnoMateria.alumno_id, AlumnoMateria.curso_id==curso).all()
        print (respuesta)
        #  filter( Alumno.id==AlumnoMateria.alumno_id, AlumnoMateria.curso_id==Curso.id).
        return respuesta


    def baja(self,id):
        e = Alumno.query.get(id)
        if e:
            e.fecha_baja = datetime.today()
            db.session.commit()
            return True
        return False

    def get_activos(self):
        return Alumno.query.filter(
        Alumno.activo == True
    )
   
           
    def modificar(self, id, data):
        e = Alumno.query.get(id)
        if e:
            e.id = data['id']
            e.nombre = data['nombre']
            e.direccion = data.get('direccion')
            e.edad= data['edad']
            e.sexo = data.get('sexo')
            e.fecha_baja=data.get('fecha_baja')               
            db.session.commit()
            return True
        return False