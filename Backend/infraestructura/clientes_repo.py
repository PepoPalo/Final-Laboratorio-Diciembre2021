from dominio.cliente import Cliente
from datos import db

class ClientesRepo():
    def get_all(self):
        return Cliente.query.filter(Cliente.activo == True).all()

    def agregar(self, data):
        cliente = Cliente(**data)
        cliente.activo = True
        db.session.add(cliente)
        db.session.commit()
        return cliente

    def get_by_id(self,id):
        return Cliente.query.get(id)

    def baja(self,id):
        m = Cliente.query.get(id)
        if m:
            m.activo =False
            db.session.commit()
            return True
        return False

    def buscar(self, desde, hasta):
        return Cliente.query.filter(
            Cliente.fecha >= desde,
            Cliente.activo == True,
            Cliente.fecha <= hasta).all()    

    def modificar(self, id, data):
        m = Cliente.query.get(id)
        if m:
            m.numero = data['numero']
            m.nombre = data['nombre']
            m.sexo = data['sexo']
            m.direccion = data['direccion']
            m.edad = data['edad']
            db.session.commit()
            return True
        return False

     