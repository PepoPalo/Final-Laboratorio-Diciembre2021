from sqlalchemy.sql.elements import Null
from dominio.asistencia import Asistencia
from datos import db
from datetime import datetime


class AsistenciaRepo():
    def get_all(self):
        return Asistencia.query.filter(Asistencia.is_(None)).all()

    def agregar(self, data):
        A = Asistencia(**data)
        db.session.add(A)
        db.session.commit()
        return A

    def get_by_id(self,id):
        return Asistencia.query.get(id)

    def baja(self,id):
        m = Asistencia.query.get(id)
        if m:
            m.fecha_baja = datetime.today()
            db.session.commit()
            return True
        return False

    def buscarPorCurso(self, curso):
        return Asistencia.query.filter(
            Asistencia.curso_id == curso).all()    

    def buscarPorAlumno(self,  alumno):
        return Asistencia.query.filter(
            Asistencia.alumno_id == alumno
           ).all()    


    def modificar(self, id, data):
        m = Asistencia.query.get(id)
        if m:
            m.fecha = data['fecha']
            m.fecha_baja = data['fecha_baja']
            m.alumno_id = data['alumno_id']
            m.curso_id = data['curso_id']            
            db.session.commit()
            return True
        return False
    
    def buscarFechaCurso(self, desde, hasta,curso):
        return Asistencia.query.filter(
            Asistencia.fecha >= desde,
            Asistencia.fecha <= hasta,
            Asistencia.curso_id == curso).all()

    def buscarFechaAlumno(self, desde, hasta,alumno):
        return Asistencia.query.filter(
            Asistencia.fecha >= desde,
            Asistencia.fecha <= hasta,
            Asistencia.alumno_id == alumno).all()

     