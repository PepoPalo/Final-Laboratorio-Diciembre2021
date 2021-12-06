from sqlalchemy.orm import session
from sqlalchemy.sql.elements import Null
from dominio.alumnomateria import AlumnoMateria
from dominio.curso import Curso


from datos import db
import datetime


class CursosRepo():
    def get_all(self):
        return Curso.query.filter(Curso.fecha_baja.is_(None)).all()
        
    def agregar(self, data):
        c = Curso(**data)
        if c:
            if data['id_prof_tit']==data['id_prof_adj']: return False
            else:
                c.fecha_baja=Null
                db.session.add(c)
                db.session.commit()
                return c
    def get_by_id(self, id):
        return Curso.query.get(id)
    def get_by_titular(self, profe_id):
        # return Curso.query(Curso, Equipo, Linea, Plan).join(Equipo.modelo).join(Linea.numero).join(Plan.nombre).filter(Curso.id == id, Curso.linea_id == Linea.id).all()
         return Curso.query.filter(Curso.id_prof_tit== profe_id).all()
    
    def get_by_alumno(self, alumno):
        respuesta = db.session.query(Curso).select_from(Curso).join(AlumnoMateria).filter( AlumnoMateria.alumno_id ==alumno).all()

        return respuesta

    def baja(self, id):
        C = Curso.query.get(id)
        if C:
            C.fecha_fin = datetime.date.today()
            C.fecha_baja = datetime.date.today()
            db.session.commit()
            return True
        return False    

    


    def buscar_by_profe(self,profe):
        return Curso.query.filter(
            Curso.profe_id == profe).first()
    
    def modificar(self,id,data):
        C = Curso.query.get(id)
        if C:
            if data['id_prof_tit']==data['id_prof_adj']: return False
            else:
                 C.id = data['id']
                 C.nombre = data['nombre']
                 C.fecha_ini = data['fecha_ini']
                 C.fecha_fin = data['fecha_fin']
                 C.id_prof_tit = data['id_prof_tit']
                 C.id_prof_adj = data['id_prof_adj']
                 C.cupo_total = data['cupo_total']
                 C.fecha_baja = Null
                 db.session.commit()
                 return True
        return False

    def buscarPorFecha(self, desde, hasta):
        return Curso.query.filter(
            Curso.fecha_ini >= desde,
            Curso.fecha_ini <= hasta).all()    

    def traer_activos(self):
        return Curso.query.filter(            
            Curso.fecha_fin  < datetime.date.today() ).all()    