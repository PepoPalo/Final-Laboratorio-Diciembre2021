from sqlalchemy.orm import relationship

from sqlalchemy import Column, Integer, String, Numeric, Date, Float, ForeignKey
from datos import db

class AlumnoMateria(db.Model):
    __tablename__ = 'alumno_materia'
    __table_args__ = (
        db.UniqueConstraint('curso_id', 'alumno_id', name='unique_curso_alumno'),
    )
    id = Column(Integer(), primary_key=True, autoincrement=True)
    curso_id = Column(Integer(),ForeignKey('cursos.id'))
    alumno_id = Column(Integer(), ForeignKey('alumnos.id'))
    curso = relationship("Curso", lazy='joined')
    alumno = relationship("Alumno", lazy='joined')
    
    # ForeignKeyConstraint(['alumno_id'], ['alumno.id'])
    # ForeignKeyConstraint(['curso_id'], ['curso.id'])

