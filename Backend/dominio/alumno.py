from sqlalchemy import Column, Integer, String, Date, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.sql.schema import ForeignKey
from datos import db

class Alumno(db.Model):

    __tablename__ = 'alumnos'
    id = Column(Integer(),primary_key=True,autoincrement = True)
    nombre = Column(String(80), nullable=False)
    direccion = Column(String(100), nullable=False)
    edad = Column(Integer(),nullable=False)
    sexo =Column(String(1), nullable=False)
    #  ForeignKey('curso.id'),

    # materias = relationship("AlumnoMateria", backref="alumnos",lazy='joined')