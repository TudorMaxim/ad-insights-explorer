from flask import Flask
from flask_cors import CORS
from config import config

from .routes import register_api_routes


def create_app():
    app = Flask(__name__)
    CORS(app)
    app.config.from_object(config)
    register_api_routes(app)
    return app
