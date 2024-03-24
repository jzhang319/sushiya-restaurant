from flask import Blueprint, jsonify, request
from app.models import User,db,Email
import os

email_routes = Blueprint('email', __name__)

@email_routes.route('/subscribe',methods=['POST'])
def subscribe():
    data = request.get_json()
    email = data.get('email')

    if not email:
        return jsonify({'error':'Email is required'}), 400
    
    email_lookup = Email.query.filter(Email.email == email).first()

    if email_lookup:
        return jsonify({'error': 'Email already registered'}),400
    
    new_user = Email(email=email)
    db.session.add(new_user)
    db.session.commit()


    return jsonify({'message': 'Subscribed successfully!'})

# @email_routes.route('/<int:id>')
# def get_email(id):
#     """
#     Query for a user by id and returns that user's email in a dictionary
#     """
#     user = User.query.get(id)  # Query the database for a user with the provided id
#     return {'email': user.email}  # Return the user's email