from flask import Flask
from config import config
from .routes import register_api_routes


def create_app():
    app = Flask(__name__)
    app.config.from_object(config)
    register_api_routes(app)
    return app
