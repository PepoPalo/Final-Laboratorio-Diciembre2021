from dominio.plan import Plan
from datos import db

class PlanesRepo():
    def get_all(self):
        return Plan.query.filter(Plan.estaActivo == True).all()

    def agregar(self, data):
        plan = Plan(**data)
        plan.estaActivo = True
        db.session.add(plan)
        db.session.commit()
        return plan
    
    def get_by_id(self, id):
        return Plan.query.get(id)

    def baja(self, id):
        plan = Plan.query.get(id)
        if plan:
            plan.estaActivo = False           
            db.session.commit()
            return True
        return False

    def modificar(self,id,data):
        plan = Plan.query.get(id)
        if plan:
            plan.nombre = data['nombre']
            plan.costo_por_mes = data['costo_por_mes']
            plan.cant_llamadas = data['cant_llamadas']
            plan.cant_mensajes = data['cant_mensajes']
            plan.cant_gigas = data['cant_gigas']
            plan.tipo = data['tipo']
            plan.estaActivo = data['estaActivo']
            db.session.commit()
            return True
        return False