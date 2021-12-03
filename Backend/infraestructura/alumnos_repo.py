from dominio.alumno import Alumno
from datos import db


class AlumnosRepo():
    def get_all(self):
        return Alumno.query.all()

    def agregar(self, data):
        e = Alumno(**data)
        e.activo = True
        db.session.add(e)
        db.session.commit()
        return e
    
    def get_by_id(self, id):
        return Alumno.query.get(id)

    def baja(self,id):
        e = Alumno.query.get(id)
        if e:
            db.session.delete(e)
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
            db.session.commit()
            return True
        return False