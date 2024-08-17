from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Item
import pandas as pd
import os

item_routes = Blueprint('items', __name__)

@item_routes.route('/')
def get_menu():
    file_path = './menu.csv'
    print(f"Loading file: {file_path}")
    if os.path.isfile(file_path):
        print("CSV file loaded successfully")
        df = pd.read_csv(file_path)
        # print(df.columns)
        # df.columns = df.columns.str.strip()
        df = df.fillna("")
        grouped = df.groupby('category')

        menu = {}
        for name, group in grouped:
            items = group.to_dict(orient='records')
            menu[name] = items

        orderedCategories = ["Soup & Salad","Kitchen","Sushi Bar","Hibachi","Beverages",]

        # Create a new list to hold the sorted data
        sortedData = []

        # Iterate over the ordered categories
        for category in orderedCategories:
            # If the category is in the grouped data, append it to the sorted data
            if category in grouped.groups:
                items = grouped.get_group(category).to_dict(orient='records')
                sortedData.append({'category': category, 'items': items})

        return jsonify(sortedData)
    else:
        return jsonify({'error': 'File not found'}), 404

@item_routes.route('/<int:id>')
def item(id):
    """
    Query for a item by id and returns that item in a dictionary
    """
    item = Item.query.get(id)
    return item.to_dict()
