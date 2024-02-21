from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Item

item_routes = Blueprint('items', __name__)

@item_routes.route('/')
def items():
    """
    Query for all items and returns them in a list of item dictionaries
    """
    items = Item.query.all()
    return {'items': [item.to_dict() for item in items]}

@item_routes.route('/<int:id>')
def item(id):
    """
    Query for a item by id and returns that item in a dictionary
    """
    item = Item.query.get(id)
    return item.to_dict()
