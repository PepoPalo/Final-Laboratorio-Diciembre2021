from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, String,Numeric, Float, Date, ForeignKey, Boolean
from datos import db

class Linea(db.Model):
    __tablename__ = 'profesores'    
    id= Column(Integer(), primary_key=True, autoincrement=True)
    nombre = Column(String(), nullable=False)
    titulo = Column(String(), nullable=False)
    direccion = Column(String(), nullable=False)
    cursos = relationship("Curso", backref="profesores",lazy='joined')
