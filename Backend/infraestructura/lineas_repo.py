import datetime
from dominio.linea import Linea
from datos import db

class LineasRepo():
    def get_all(self):
        return Linea.query.filter(Linea.activa == True).all()

    def agregar(self, data):
        a = Linea(**data)
        a.activa = True
        db.session.add(a)
        db.session.commit()
        return a
    
    def get_by_numero(self, id):
        return Linea.query.get(id)

    def baja(self, id):
        a = Linea.query.get(id)
        if a:
            a.activa = False
            db.session.commit()
            return True
        return False

    def modificar(self,id,data):
        a = Linea.query.get(id)
        if a:
            a.numero = data['numero']
            a.estado = data['estado']
            a.activa = data['activa']
            db.session.commit()
            return True
        return False

    def buscar(self):
        return Linea.query.filter(
            Linea.activa ==True
           ).all()

   
