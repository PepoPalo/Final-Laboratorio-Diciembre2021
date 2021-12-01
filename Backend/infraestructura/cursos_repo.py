from dominio.Curso import Curso
from dominio.cliente_lep import ClienteLep
from dominio.equipo import Equipo
from dominio.linea import Linea
from dominio.plan import Plan
from datos import db
import datetime


class CursoRepo():
    def get_all(self, cliente):
        return Curso.query.all()
        
    def agregar(self, data):
        Curso = Curso(**data)
        db.session.add(Curso)
        db.session.commit()
        return Curso
    
    def get_by_id(self, id):
        return Curso.query(Curso, Equipo, Linea, Plan).join(Equipo.modelo).join(Linea.numero).join(Plan.nombre).filter(Curso.id == id, Curso.linea_id == Linea.id).all()

    def baja(self, id):
        Curso = Curso.query.get(id)
        if Curso:
            Curso.fecha_fin = datetime.date.today()
            db.session.commit()
            return True
        return False    

    


    def buscar_by_profe(self,profe):
        return Curso.query.filter(
            Curso.profe_id == profe).first()
    
    def modificar(self,id,data):
        Curso = Curso.query.get(id)
        if Curso:
            Curso.id = data['id']
            Curso.nombre = data['nombre']
            Curso.fecha_ini = data['fecha_ini']
            Curso.fecha_fin = data['fecha_fin']
            Curso.id_prof_tit = data['id_prof_tit']
            Curso.id_prof_adj = data['id_prof_adj']
            Curso.cupo_total = data['cupo_total']
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