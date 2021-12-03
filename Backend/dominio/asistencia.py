from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, String, Float, Date, ForeignKey, Boolean
from datos import db

class Asistencia(db.Model):
    __tablename__ = 'Asistencia'    
    id= Column(Integer(), primary_key=True, autoincrement=True)
    alumno_id = Column(Integer(), ForeignKey('alumnos.id'), nullable=False)
    curso_id = Column(Integer(), ForeignKey('alumnos.id'), nullable=False)
    fecha = Column(Date(), nullable=False)
    presente = Column(Boolean(), nullable=False)
    fecha_baja = Column(Date(),nullable=True )

    curso = relationship("cursos", backref="alumno_materia",lazy='joined')
    alumno = relationship("alumnos", backref="alumno_materia",lazy='joined')