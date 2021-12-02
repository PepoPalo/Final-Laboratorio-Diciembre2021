from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, String, Numeric, Date, Float
from datos import db

class AlumnoMateria(db.Model):
    __tablename__ = 'alumno_materia'
    __table_args__ = (
        db.UniqueConstraint('curso_id', 'alumno_id', name='unique_curso_alumno'),
    )
    id = Column(Integer(), primary_key=True, autoincrement=True)
    curso_id = Column(Integer, ForeignKey('curso.id'))
    alumno_id = Column(Integer,  ForeignKey('alumno.id'))
    curso = relationship("Curso", backref="alumno_materia",lazy='joined')
    alumno = relationship("Alumno", backref="alumno_materia",lazy='joined')

    # ForeignKeyConstraint(['alumno_id'], ['alumno.id'])
    # ForeignKeyConstraint(['curso_id'], ['curso.id'])

