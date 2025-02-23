import time
from typing import List

import requests

from config import Config
from src.ad_insights_explorer_api.model import Post


class PostsCache:
    def __init__(self):
        self.__posts = None
        self.__last_fetched = None
        self.__expiry_duration = Config.POST_CACHE_EXPIRY_DURATION

    def get(self) -> List[Post]:
        current_time = time.time()
        if (
            self.__posts is None
            or (current_time - self.__last_fetched) > self.__expiry_duration
        ):
            self.__fetch()
        return self.__posts

    def __fetch(self):
        print("Fetching posts.")
        response = requests.get(url=Config.POSTS_URL)
        response.raise_for_status()
        self.__posts = [Post(**post_data) for post_data in response.json()]
        self.__last_fetched = time.time()


posts_cache = PostsCache()
