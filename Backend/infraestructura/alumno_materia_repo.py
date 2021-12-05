import datetime

from flask_restx.inputs import date
from dominio.curso import Curso
from dominio.alumnomateria import AlumnoMateria

from datos import db

class AlumnoMateriaRepo():
    def get_all(self):
        return AlumnoMateria.query.all()

    def agregar(self, data):
        a = AlumnoMateria(**data)
        db.session.add(a)
        db.session.commit()
        return a
    
    def get_by_numero(self, numero):
        return AlumnoMateria.query.get(numero)

    # def bajaalumno(self, numero):
    #     a = AlumnoMateria.query.filter(            
    #         AlumnoMateria.alumno_id  == numero).all()     
    #     if a:
    #         for x in a:             
    #          x.fecha_baja = datetime.date.today()
    #         db.session.commit()
    #         return True
    #     return False



    # def bajacurso(self, numero):
    #     a = AlumnoMateria.query.filter(            
    #         AlumnoMateria.curso_id == numero).all()               
    #     if a:
    #         for x in a:
    #             db.session.remove(a)
    #         db.session.commit()
    #         return True
    #     return False


        
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



#     def buscar_by_curso(self, curso):
#         respuestacurso = db.session.query(AlumnoMateria).filter( AlumnoMateria.curso_id==curso).all()
# # select_from(Curso).join(AlumnoMateria).
#         # respuestacurso =  AlumnoMateria.query.filter(            
#         #     AlumnoMateria.curso_id == curso)
#         print(respuestacurso)
#         return respuestacurso



    def buscar_x_curso(self, curso):
        respuestaalumno =  AlumnoMateria.query.filter(            
            AlumnoMateria.curso_id == curso).all() 
        print(respuestaalumno)          
        return respuestaalumno

    def buscar_by_alumno(self, alumno):
        respuestaalumno =  AlumnoMateria.query.filter(            
            AlumnoMateria.alumno_id == alumno).all() 
        print(respuestaalumno)          
        return respuestaalumno