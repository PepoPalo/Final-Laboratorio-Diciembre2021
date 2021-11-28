from sqlalchemy.orm import relationship
from sqlalchemy import Column, Boolean, Float, Integer, String, Numeric
from datos import db

class Plan(db.Model):
    __tablename__ = 'planes'
    id = Column(Integer(), primary_key=True, autoincrement=True)
    nombre = Column(String(), nullable=False)
    costo_por_mes = Column(Float())
    cant_llamadas = Column(Integer(),  nullable=False)
    cant_mensajes = Column(Integer(),  nullable=False)
    cant_gigas = Column(Integer(),  nullable=False)
    tipo = Column(String(), nullable=False)
    estaActivo = Column(Boolean(True))
    
