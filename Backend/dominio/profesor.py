from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, String,Numeric, Float, Date, ForeignKey, Boolean
from datos import db

class Profesor(db.Model):
    __tablename__ = 'profesores'    
    id= Column(Integer(), primary_key=True, autoincrement=True)
    nombre = Column(String(), nullable=False)
    titulo = Column(String(), nullable=False)
    direccion = Column(String(), nullable=False)
    fecha_baja= Column(Date(), nullable=True)
#     cursos = relationship("Curso", backref="profesores",lazy='joined')
#  ForeignKey('curso.id_prof_tit'),