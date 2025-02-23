from config import Config
from tests.fixtures import client, mock_api_request


def test_anomalies_title_too_short(client, mock_api_request):
    mock_api_request(Config.POSTS_URL, ".\\tests\\mocks\\mock_posts.json")
    response = client.get("/api/anomalies/")
    data = response.get_json()
    assert response.status_code == 200

    short_title_posts = data["shortTitlePosts"]
    assert len(short_title_posts) == 2
    for post in short_title_posts:
        assert len(post["title"]) < Config.POSTS_MIN_TITLE_LENGTH


def test_anomalies_duplicate_titles(client, mock_api_request):
    mock_api_request(Config.POSTS_URL, ".\\tests\\mocks\\mock_posts.json")
    response = client.get("/api/anomalies/")
    data = response.get_json()
    assert response.status_code == 200

    duplicates = data["duplicateTitlePosts"]
    assert len(duplicates) == 2
    assert duplicates[0]["post"]["title"] == duplicates[1]["post"]["title"]
    assert duplicates[0]["post"]["userId"] == duplicates[1]["post"]["userId"]
