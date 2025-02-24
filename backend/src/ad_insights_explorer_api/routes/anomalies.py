import requests
from flask import Blueprint, jsonify

from src.ad_insights_explorer_api.controller import AnomaliesController
from src.ad_insights_explorer_api.repository import posts_cache

anomalies_blueprint = Blueprint("anomalies", __name__)


@anomalies_blueprint.route("/")
def anomalies():
    try:
        anomalies_controller = AnomaliesController(posts_cache)
        with_title_too_short = anomalies_controller.title_too_short()
        with_duplicate_titles = anomalies_controller.duplicate_titles()
        users_too_many_similar_titles = anomalies_controller.too_many_similar_titles()
        return jsonify(
            {
                "shortTitlePosts": [
                    post.model_dump(by_alias=True) for post in with_title_too_short
                ],
                "duplicateTitlePosts": [
                    dict(post=post.model_dump(by_alias=True), frequency=frequency)
                    for post, frequency in with_duplicate_titles
                ],
                "usersTooManySimilarTitles": users_too_many_similar_titles,
            }
        )

    except requests.exceptions.RequestException as e:
        return jsonify({"error": str(e)}), 500
