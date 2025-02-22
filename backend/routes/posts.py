import requests
from flask import Blueprint, jsonify
from config import Config

posts_blueprint = Blueprint("posts", __name__)

@posts_blueprint.route("/")
def posts():
    response = requests.get(url=Config.POSTS_URL)
    data = response.json()
    return jsonify({
        "posts": data
    })