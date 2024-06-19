from flask_restful import Resource, reqparse, abort
from ..models import CategoryModel
from api import db
import re


class CreateCategory(Resource):
    def post(self):

        # Define custom validation function for color argument
        def validate_color(color):
            if not re.match(r'^#[0-9a-fA-F]{6}$', color):
                abort(409, message="Color must be a string of 7 characters, where the first character is '#' and the following 6 are valid hexadecimal digits.")
            return color

        category_post_args = reqparse.RequestParser()
        category_post_args.add_argument('name', type=str, help="", required=True)
        category_post_args.add_argument('color', type=validate_color, help="", required=True)
        args = category_post_args.parse_args()

        new_category = CategoryModel(name=args['name'], color=args['color'])
        db.session.add(new_category)
        db.session.commit()
        return {'message': 'Category created successfully.', 'id': new_category.id}, 201



class UpdateCategory(Resource):
    def put(self, category_id):
        category = CategoryModel.query.get(category_id)
        if not category:
            return {'message': 'Category not found'}, 404

        parser = reqparse.RequestParser()
        parser.add_argument('name', type=str, help="Name of category")
        parser.add_argument('color', type=str, help="Color of category")
        args = parser.parse_args()

        if args['name']:
            category.name = args['name']

        if args['color']:
            category.color = args['color']

        db.session.commit()
        return {'message': 'Category updated successfully.', 'id': category_id}, 200



class GetAllCategories(Resource):
    def get(self):
        categories = CategoryModel.query.all()
        return [cat.to_dict() for cat in categories], 200




class DeleteCategory(Resource):
    def delete(self, category_id):
        category = CategoryModel.query.get(category_id)
        if not category:
            return {'message': 'Category not found'}, 404
        db.session.delete(category)
        db.session.commit()
        return {'message': 'Category deleted successfully.'}, 200


