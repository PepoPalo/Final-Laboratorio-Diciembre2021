from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, String,Numeric, Float, Date, ForeignKey, Boolean
from datos import db

class Linea(db.Model):
    __tablename__ = 'lineas'    
    id= Column(Integer(), primary_key=True, autoincrement=True)
    numero = Column(String(), nullable=False)
    estado = Column(String(), nullable=False)
    activa =  Column(Boolean(True), nullable=False)
