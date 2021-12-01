import datetime
from dominio.alumnomateria import AlumnoMateria
from dominio.lineaequipoplan import Lineaequipoplan
from datos import db

class AlumnoMateriaRepo():
    def get_all(self):
        return AlumnoMateria.query.filter(AlumnoMateria.activo == True).all()

    def agregar(self, data):
        a = AlumnoMateria(**data)
        db.session.add(a)
        db.session.commit()
        return a
    
    def get_by_numero(self, numero):
        return AlumnoMateria.query.get(numero)

    def bajaalumno(self, numero):
        a = AlumnoMateria.query.filter(            
            AlumnoMateria.alumno_id  == numero).all()     
        if a:
            for x in a:             
             db.session.delete(x)
            db.session.commit()
            return True
        return False



    def bajacurso(self, numero):
        a = AlumnoMateria.query.filter(            
            AlumnoMateria.curso_id == numero).all()               
        if a:
            for x in a:
                db.session.remove(a)
            db.session.commit()
            return True
        return False


        
    def modificar(self,numero,data):
        a = AlumnoMateria.query.get(numero)
        if a:
            a.id = data['id']
            a.curso_id = data['curso_id']
            a.alumno_id = data['alumno_id']  
            db.session.commit()
            return True
        return False

    # def buscar(self, desde, hasta):
    #     return AlumnoMateria.query.filter(
    #         AlumnoMateria.fecha >= desde,
    #         AlumnoMateria.fecha <= hasta,
    #         AlumnoMateria.activo ==True).all()



    def buscar_by_curso(self, curso):
        return AlumnoMateria.query.filter(            
            AlumnoMateria.curso_id == curso
           ).all()



    def buscar_by_alumno(self, alumno):
        return AlumnoMateria.query.filter(            
            AlumnoMateria.alumno_id == alumno).all()           