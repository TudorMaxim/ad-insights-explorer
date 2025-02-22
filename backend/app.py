from flask import Flask
from config import config
from routes import register_api_routes


def create_app():
    app = Flask(__name__)
    app.config.from_object(config)
    register_api_routes(app)
    return app


if __name__ == '__main__':
    ad_insights_explorer_app = create_app()
    print(ad_insights_explorer_app.url_map)
    ad_insights_explorer_app.run(debug=True)
