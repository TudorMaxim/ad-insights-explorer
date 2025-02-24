import pytest

from config import Config
from tests.fixtures import client, mock_api_request


def test_summary_most_frequent_words(client, mock_api_request):
    mock_api_request(Config.POSTS_URL, ".\\tests\\mocks\\mock_posts.json")
    response = client.get("/api/summary/")
    data = response.get_json()
    assert response.status_code == 200

    res = data["mostFrequentWords"]
    assert len(res) == 50
    for i in range(len(res) - 1):
        assert res[i]["count"] >= res[i + 1]["count"]


@pytest.mark.parametrize("expected", [[(5, 17), (3, 15), (1, 13)]])
def test_summary_top_users_with_unique_words(expected, client, mock_api_request):
    mock_api_request(Config.POSTS_URL, ".\\tests\\mocks\\mock_posts.json")
    response = client.get("/api/summary/")
    data = response.get_json()
    assert response.status_code == 200

    res = data["usersWithMostUniqueWords"]
    assert len(res) == len(expected)
    for i in range(len(res)):
        expected_user_id, expected_count = expected[i]
        assert res[i]["userId"] == expected_user_id
        assert res[i]["count"] == expected_count
