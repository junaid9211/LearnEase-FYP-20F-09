from flask import Flask, send_from_directory
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

db = SQLAlchemy()


def create_app():
    app = Flask(__name__)
    CORS(app)

    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
    db.init_app(app)

    # Static file serving route
    @app.route('/covers/<path:filename>')
    def static_files(filename):
        return send_from_directory('../covers', filename)

    from api.resources import initialize_routes

    api = Api(app)
    initialize_routes(api)
    return app