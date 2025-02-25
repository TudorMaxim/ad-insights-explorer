import pytest

from config import Config
from tests.fixtures import client, mock_api_request


def test_fetch_all(client, mock_api_request):
    mock_api_request(Config.POSTS_URL, ".\\tests\\mocks\\mock_posts.json")
    response = client.get("/api/posts/")
    data = response.get_json()

    assert response.status_code == 200
    assert len(data["posts"]) == 10


@pytest.mark.parametrize("user_id", [1, 2, 3, 4, 5])
def test_fetch_by_user_id(user_id, client, mock_api_request):
    mock_api_request(Config.POSTS_URL, ".\\tests\\mocks\\mock_posts.json")
    response = client.get(f"/api/posts/?userId={user_id}")
    data = response.get_json()

    assert response.status_code == 200
    assert len(data["posts"]) == 2
    assert data["posts"][0]["userId"] == user_id
    assert data["posts"][1]["userId"] == user_id


@pytest.mark.parametrize(
    "page,page_size,expected_post_ids",
    [
        (1, 5, [1, 2, 3, 4, 5]),
        (2, 5, [6, 7, 8, 9, 10]),
        (3, 5, []),
        (1, 20, list(range(1, 11))),
        (3, 4, [9, 10]),
    ],
)
def test_paginated_response(
    page, page_size, expected_post_ids, client, mock_api_request
):
    mock_api_request(Config.POSTS_URL, ".\\tests\\mocks\\mock_posts.json")
    response = client.get(f"/api/posts/?page={page}&pageSize={page_size}")
    data = response.get_json()

    assert response.status_code == 200
    assert len(data["posts"]) == len(expected_post_ids)
    for expected_post_id, actual_post in zip(expected_post_ids, data["posts"]):
        assert expected_post_id == actual_post["id"]


def test_invalid_user_id(client, mock_api_request):
    mock_api_request(Config.POSTS_URL, ".\\tests\\mocks\\mock_posts.json")
    response = client.get("/api/posts/?userId=0")
    assert response.status_code == 400


def test_invalid_page(client, mock_api_request):
    mock_api_request(Config.POSTS_URL, ".\\tests\\mocks\\mock_posts.json")
    response = client.get("/api/posts/?page=-1")
    assert response.status_code == 400


def test_invalid_page_size(client, mock_api_request):
    mock_api_request(Config.POSTS_URL, ".\\tests\\mocks\\mock_posts.json")
    response = client.get("/api/posts/?pageSize=0")
    assert response.status_code == 400


def test_invalid_page_size_when_page_missing(client, mock_api_request):
    mock_api_request(Config.POSTS_URL, ".\\tests\\mocks\\mock_posts.json")
    response = client.get("/api/posts/?pageSize=5")
    assert response.status_code == 400
