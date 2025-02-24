import requests
from flask import Blueprint, jsonify

from src.ad_insights_explorer_api.controller import SummaryController
from src.ad_insights_explorer_api.repository import posts_cache

summary_blueprint = Blueprint("summary", __name__)


@summary_blueprint.route("/")
def summary():
    try:
        summary_controller = SummaryController(posts_cache)
        most_frequent_words = summary_controller.most_frequent_words()
        users_with_most_unique_words = summary_controller.users_with_most_unique_words()
        top_3 = users_with_most_unique_words[:3]
        return jsonify(
            {
                "mostFrequentWords": [
                    dict(word=word, count=frequency)
                    for word, frequency in most_frequent_words
                ],
                "usersWithMostUniqueWords": [
                    dict(userId=user_id, count=frequency)
                    for user_id, frequency in top_3
                ],
            }
        )
    except requests.exceptions.RequestException as e:
        return jsonify({"error": str(e)}), 500
