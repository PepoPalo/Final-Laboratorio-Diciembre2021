from dominio.asistencia import Asistencia
from datos import db

class AsistenciaRepo():
    def get_all(self):
        return Asistencia.query.all()

    def agregar(self, data):
        A = Asistencia(**data)
        db.session.add(A)
        db.session.commit()
        return Asistencia

    def get_by_id(self,id):
        return Asistencia.query.get(id)

    # def baja(self,id):
    #     m = Asistencia.query.get(id)
    #     if m:
    #         m.activo =False
    #         db.session.commit()
    #         return True
    #     return False

    def buscarPorCurso(self, curso):
        return Asistencia.query.filter(
            Asistencia.curso_id == curso).all()    

    def buscarPorAlumno(self,  alumno):
        return Asistencia.query.filter(
            Asistencia.alumno_id == alumno,
           ).all()    


    def modificar(self, id, data):
        m = Asistencia.query.get(id)
        if m:
            m.fecha = data['fecha']
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

     