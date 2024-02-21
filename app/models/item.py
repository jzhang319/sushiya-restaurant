from .db import db, environment, SCHEMA
from flask_login import UserMixin

class Item(db.Model, UserMixin):
    __tablename__ = 'items'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer, primary_key=True)
    category = db.Column(db.String(100), nullable=False, unique=True)
    item = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(255))
    price = db.Column(db.Float, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())

    images = db.relationship('Image', back_populates='item',cascade='all,delete-orphan', lazy='select')
