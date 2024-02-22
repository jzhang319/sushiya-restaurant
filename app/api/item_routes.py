from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Item
import pandas as pd
import os

item_routes = Blueprint('items', __name__)

@item_routes.route('/')
def get_menu():
    file_path = './mock_restaurant_data.csv'
    if os.path.isfile(file_path):
        df = pd.read_csv(file_path)
        grouped = df.groupby('category')

        menu = {}
        for name, group in grouped:
            items = group.drop('category', axis=1).to_dict(orient='records')
            menu[name] = items

        return jsonify(menu)
    else:
        return jsonify({'error': 'File not found'}), 404

@item_routes.route('/<int:id>')
def item(id):
    """
    Query for a item by id and returns that item in a dictionary
    """
    item = Item.query.get(id)
    return item.to_dict()
