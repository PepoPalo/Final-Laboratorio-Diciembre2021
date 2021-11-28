from sqlalchemy import Column, Integer, String, Date, Boolean
from sqlalchemy.orm import relationship
from datos import db

class Equipo(db.Model):
    __tablename__ = 'equipos'
    imei = Column(Integer, primary_key=True, autoincrement=True)
    marca = Column(String(20), nullable=False)
    modelo = Column(String(120), nullable=False)
    estado = Column(String(15),nullable=False)
    fecha_ingreso =Column(Date(),nullable=False)
    activo = Column(Boolean(), nullable=True)
