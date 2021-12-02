from sqlalchemy.orm import relationship
from sqlalchemy import Column, Boolean, Float, Integer, String, Numeric, Date
from datos import db

class Curso(db.Model):
    __tablename__ = 'cursos'
    id = Column(Integer(), primary_key=True, autoincrement=True)
    nombre = Column(String(), nullable=False)
    fecha_ini = Column(Date(),  nullable=False)
    fecha_fin = Column(Date(),  nullable=False)
    id_prof_tit = Column(Integer(),  ForeignKey('profesor.id'), primary_key=true)
    id_prof_adj = Column(Integer(),  ForeignKey('profesor.id'))
    cupo_total = Column(Integer(),  nullable=False)
    prof_tit = relationship("Profesor", backref="cursos",lazy='joined')
    prof_adj = relationship("Profesor", backref="cursos",lazy='joined')




    
