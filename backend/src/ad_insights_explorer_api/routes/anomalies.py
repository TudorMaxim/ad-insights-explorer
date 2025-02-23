import requests
from flask import Blueprint, jsonify
from src.ad_insights_explorer_api.repository import posts_cache
from src.ad_insights_explorer_api.controller import AnomaliesController


anomalies_blueprint = Blueprint("anomalies", __name__)

@anomalies_blueprint.route("/")
def anomalies():
   try:
      posts = posts_cache.get()
      anomalies_controller = AnomaliesController(posts)
      with_title_too_short = anomalies_controller.title_too_short()
      with_duplicate_titles = anomalies_controller.duplicate_titles()
      return jsonify({
         "shortTitlePosts": [post.model_dump(by_alias=True) for post in with_title_too_short],
         "duplicateTitles": [
            dict(
               post=post.model_dump(by_alias=True),
               frequency=frequency
            )
            for post, frequency in with_duplicate_titles]
      })

   except requests.exceptions.RequestException as e:
      return jsonify({ "error": str(e)}), 500
