from .db import db, environment, SCHEMA
from flask_login import UserMixin

class Email(db.Model):
    __tablename__ = 'emails'

    if environment == 'production':
        __table_args__ = {'schema' : SCHEMA}


    id = db.Column(db.Integer,primary_key=True)
    name = db.Column(db.String(40))
    email = db.Column(db.String(100),nullable=False, unique=True)
    phone = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())

    def to_dic(self):
        return {
            'id':self.id,
            'name':self.name,
            'email':self.email,
            'phone':self.phone,
            'created_at':self.created_at,
            'updated_at':self.updated_at
        }
