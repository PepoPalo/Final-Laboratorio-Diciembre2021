from sqlalchemy.orm import relationship
from sqlalchemy import Column, Boolean, Float, Integer, String, Numeric, Date
from datos import db

class Plan(db.Model):
    __tablename__ = 'cursos'
    id = Column(Integer(), primary_key=True, autoincrement=True)
    nombre = Column(String(), nullable=False)
    fecha_ini = Column(Date(),  nullable=False)
    fecha_fin = Column(Date(),  nullable=False)
    id_prof_tit = Column(Integer(),  nullable=False)
    id_prof_adj = Column(Integer(),  nullable=True)
    cupo_total = Column(Integer(),  nullable=False)
    ForeignKeyConstraint(['id_prof_tit'], ['profesor.id'])
    ForeignKeyConstraint(['id_prof_adj'], ['profesor.id'])



    
