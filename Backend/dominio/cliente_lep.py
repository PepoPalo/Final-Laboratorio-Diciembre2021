from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, String, Float, Date, ForeignKey, Boolean
from datos import db

class ClienteLep(db.Model):
    __tablename__ = 'cliente_lep'    
    id= Column(Integer(), primary_key=True, autoincrement=True)
    cliente_id = Column(Integer(), nullable=False)
    lep_id = Column(Integer(), nullable=False)
    activo = Column(Boolean(True), nullable=False)
