from flask import Blueprint, jsonify

anomalies_blueprint = Blueprint("anomalies", __name__)

@anomalies_blueprint.route("/")
def anomalies():
   response = jsonify({
      "TODO": "Implement me"
   })
   return response, 200
