from dominio.equipo import Equipo
from datos import db


class EquiposRepo():
    def get_all(self):
        return Equipo.query.filter(Equipo.activo == True).all()

    def agregar(self, data):
        e = Equipo(**data)
        e.activo = True
        db.session.add(e)
        db.session.commit()
        return e
    
    def get_by_id(self, id):
        return Equipo.query.get(id)

    def baja(self,id):
        e = Equipo.query.get(id)
        if e:
            e.activo = False
            db.session.commit()
            return True
        return False

    def get_activos(self):
        return Equipo.query.filter(
        Equipo.activo == True
    )
    def buscar_by_activo(self, desde, hasta):
        return Equipo.query.filter(
            Equipo.fecha_ingreso >= desde,
            Equipo.fecha_ingreso <= hasta,
            Equipo.activo ==True).all()
    def buscar_disponibles(self):
        return Equipo.query.filter(
            Equipo.estado!="Vendido"
        )
    def asociar_a_linea(self,id):
        e = Equipo.query.get(id)
        if e:
            e.estado = "Vendido",
            e.activo = True
            return True
        return False
           
    def modificar(self, id, data):
        e = Equipo.query.get(id)
        if e:
            e.imei = data['imei']
            e.marca = data['marca']
            e.modelo = data.get('modelo')
            e.estado= data['estado']
            e.fecha_ingreso = data.get('fecha_ingreso')
            e.activo = data['activo']            
            db.session.commit()
            return True
        return False