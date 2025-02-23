import pytest
from src.ad_insights_explorer_api import create_app

@pytest.fixture
def client():
    app = create_app()
    app.config.update({
        "TESTING": True,
    })
    yield app.test_client()

