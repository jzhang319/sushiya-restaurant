from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_login import UserMixin

class Image(db.Model, UserMixin):
    __tablename__ = 'images'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)

    item_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('items.id'), ondelete='CASCADE'), nullable=False)
    item = db.relationship('Item', back_populates='images', lazy='select')

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())
