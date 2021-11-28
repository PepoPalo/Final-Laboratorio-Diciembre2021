from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, String, Numeric, Date, Float
from datos import db

class Lineaequipoplan(db.Model):
    __tablename__ = 'li_eq_pl'
    id = Column(Integer(), primary_key=True, autoincrement=True)
    plan_id = Column(Integer(), nullable=False)
    linea_id = Column(Integer(), nullable=False)
    equipo_id =  Column(Integer(), nullable=False)
    fecha_ini = Column(Date(), nullable=False)
    fecha_fin = Column(Date(), nullable=True)
    plan_costo = Column(Float(), nullable=False)
