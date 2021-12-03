from dominio.profesor import Profesor
from datos import db

class ProfesoresRepo():
    def get_all(self):
        return Profesor.query.all()

    def agregar(self, data):
        P = Profesor(**data)
        db.session.add(P)
        db.session.commit()
        return P
    
    def get_by_id(self, id):
        return Profesor.query.get(id)

    def baja(self, id):
        P = Profesor.query.get(id)
        if P:
            db.session.delete(P)       
            db.session.commit()
            return True
        return False

    def modificar(self,id,data):
        P = Profesor.query.get(id)
        if P:
            P.nombre = data['nombre']
            P.direccion = data['direccion']
            P.titulo = data['titulo']
            db.session.commit()
            return True
        return False


        ## hacer un join con cursos aca?


