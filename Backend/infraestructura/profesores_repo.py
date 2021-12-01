from dominio.Profesor import Profesor
from datos import db

class ProfesoresRepo():
    def get_all(self):
        return Profesor.query.all()

    def agregar(self, data):
        Profesor = Profesor(**data)
        db.session.add(Profesor)
        db.session.commit()
        return Profesor
    
    def get_by_id(self, id):
        return Profesor.query.get(id)

    def baja(self, id):
        Profesor = Profesor.query.get(id)
        if Profesor:
            db.session.delete(Profesor)       
            db.session.commit()
            return True
        return False

    def modificar(self,id,data):
        Profesor = Profesor.query.get(id)
        if Profesor:
            Profesor.nombre = data['nombre']
            Profesor.costo_por_mes = data['costo_por_mes']
            Profesor.cant_llamadas = data['cant_llamadas']
            Profesor.cant_mensajes = data['cant_mensajes']
            Profesor.cant_gigas = data['cant_gigas']
            Profesor.tipo = data['tipo']
            Profesor.estaActivo = data['estaActivo']
            db.session.commit()
            return True
        return False