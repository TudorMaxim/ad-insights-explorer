from flask import Blueprint, jsonify

summary_blueprint = Blueprint("summary", __name__)


@summary_blueprint.route("/")
def summary():
    response = jsonify({"TODO": "Implement me"})
    return response, 200
