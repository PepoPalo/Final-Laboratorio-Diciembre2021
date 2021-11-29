from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, String, Float, Date, ForeignKey, Boolean
from datos import db

class ClienteLep(db.Model):
    __tablename__ = 'Asistencia'    
    id= Column(Integer(), primary_key=True, autoincrement=True)
    alumno_id = Column(Integer(), nullable=False)
    curso_id = Column(Integer(), nullable=False)
    fecha = Column(Date(), nullable=False)
    presente = Column(Boolean(), nullable=False)
    ForeignKeyConstraint(['alumno_id'], ['alumno.id'])
    ForeignKeyConstraint(['curso_id'], ['curso.id'])
