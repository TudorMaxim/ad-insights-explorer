from flask import Blueprint, Flask

from .anomalies import anomalies_blueprint
from .posts import posts_blueprint
from .summary import summary_blueprint


def register_api_routes(app: Flask):
    api_blueprint = Blueprint("api", __name__, url_prefix="/api")

    api_blueprint.register_blueprint(posts_blueprint, url_prefix="/posts")
    api_blueprint.register_blueprint(anomalies_blueprint, url_prefix="/anomalies")
    api_blueprint.register_blueprint(summary_blueprint, url_prefix="/summary")

    app.register_blueprint(api_blueprint)
