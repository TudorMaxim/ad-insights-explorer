from src.ad_insights_explorer_api import create_app


if __name__ == '__main__':
    ad_insights_explorer_app = create_app()
    ad_insights_explorer_app.run(debug=True)
