from flask import Blueprint, jsonify, request
from app.models import User,db
import os

email_routes = Blueprint('email', __name__)

@email__routes.route('/subscribe',methods=['POST'])
def subscribe():
    data = request.get_json()
    email = data.get('email')

    if not email:
        return jsonify({'error':'Email is required'}), 400
    
    user = User.query.filter(User.email == email).first()

    if user:
        return jsonify({'error': 'Email already registered'}),400
    
    new_user = User(email=email)
    db.session.add(new_user)
    db.session.commit()


    return jsonify({'message': 'Subscribed successfully!'})