from flask import Flask
from flask_restx import Api
from flask_cors import CORS

from datos import db

from api.clientes_api import nsCliente
from api.equipos_api import nsEquipo
from api.lineas_api import nsLinea
from api.lineaequipoplan_api import nsLEP
from api.planes_api import nsPlan
from api.cliente_lep_api import nsclienteLEP

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://postgres:Yegua2020@localhost/Telefonia"

CORS(app)
db.init_app(app)

with app.app_context():
    db.create_all()


api = Api(app, version='1.0.beta', title='Telefonía', description='Administracion de servicio de telefonía')

api.add_namespace(nsCliente)
api.add_namespace(nsEquipo)
api.add_namespace(nsLinea) 
api.add_namespace(nsLEP)
api.add_namespace(nsPlan)
api.add_namespace(nsclienteLEP)

if __name__ == '__main__':
    app.run()