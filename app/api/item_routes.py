from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Item
import pandas as pd

item_routes = Blueprint('items', __name__)

@item_routes.route('/')
def get_menu():
    df = pd.read_csv('path/to/menu.csv')
    return jsonify(df.to_dict(orient='records'))

@item_routes.route('/<int:id>')
def item(id):
    """
    Query for a item by id and returns that item in a dictionary
    """
    item = Item.query.get(id)
    return item.to_dict()
