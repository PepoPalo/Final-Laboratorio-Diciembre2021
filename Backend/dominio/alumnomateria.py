from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, String, Numeric, Date, Float
from datos import db

class Lineaequipoplan(db.Model):
    __tablename__ = 'alumno_materia'
    # id = Column(Integer(), primary_key=True, autoincrement=True)
    alumno_id = Column(Integer(), nullable=False)
    curso_id = Column(Integer(), nullable=False)
    ForeignKeyConstraint(['alumno_id'], ['alumno.id'])
    ForeignKeyConstraint(['curso_id'], ['curso.id'])

