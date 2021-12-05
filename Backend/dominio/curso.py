from sqlalchemy.orm import relationship
from sqlalchemy import Column, Boolean, Float, Integer, String, Numeric, Date,ForeignKey
from sqlalchemy.orm.relationships import foreign
from sqlalchemy.sql.expression import null
from sqlalchemy.sql.schema import ForeignKeyConstraint
from datos import db

class Curso(db.Model):
    __tablename__ = 'cursos'
    # __table_args__ = (
    #     db.UniqueConstraint('id_prof_tit', 'id_prof_adj', name='unique_titular_adjunto'),
    # )
    id = Column(Integer(),primary_key=True,  unique=True, autoincrement=True)
    nombre = Column(String(), nullable=False)
    fecha_ini = Column(Date(),  nullable=False)
    fecha_fin = Column(Date(),  nullable=False)
    id_prof_tit = Column(Integer(), primary_key=True, nullable=False)
    id_prof_adj = Column(Integer())
    cupo_total = Column(Integer(),  nullable=False)
    fecha_baja = Column(Date(),nullable=True )
    # prof_tit = relationship("Profesor", backref="cursos",lazy='joined')
    # prof_adj = relationship("Profesores", backref="cursos",lazy='joined')
  
# ForeignKey('profesor.id'),

    
