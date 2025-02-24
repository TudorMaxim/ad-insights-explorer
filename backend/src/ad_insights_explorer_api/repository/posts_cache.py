import time
from collections import defaultdict
from typing import Dict, List

import requests

from config import Config
from src.ad_insights_explorer_api.model import Post


class PostsCache:
    """
    Class that caches the post and supports accessing them either as a list or a dictionary nomalised by user ID.

    Attributes:
        __posts (List[Post]): list of posts
        __user_posts_dict (Dict[int, List[Post]]): dictionary containing all the posts mapped to their user ID.
        __last_fetched (int): timestamp representing when posts were previously fetched.
        __expiry_duration (int): timestamp representing when posts where fetched again.
    """

    def __init__(self):
        self.__posts = None
        self.__user_posts_dict = None
        self.__last_fetched = None
        self.__expiry_duration = Config.POST_CACHE_EXPIRY_DURATION

    def get(self) -> List[Post]:
        """
        Function that returns the most recent list of posts.

        Returns:
            List[Post]: the most recent list of posts.
        """
        current_time = time.time()
        if (
            self.__posts is None
            or (current_time - self.__last_fetched) > self.__expiry_duration
        ):
            self.__fetch()
        return self.__posts

    def get_user_posts_dict(self) -> Dict[int, List[Post]]:
        """
        Function that returns the most recent posts nomalised by user ID.

        Returns:
            Dict[int, List[Post]]: dictionary containing the most recent posts nomalised by user ID.
        """
        current_time = time.time()
        if (
            self.__user_posts_dict is None
            or (current_time - self.__last_fetched) > self.__expiry_duration
        ):
            self.__fetch()
        return self.__user_posts_dict

    def __fetch(self):
        print("Fetching posts.")
        response = requests.get(url=Config.POSTS_URL)
        response.raise_for_status()
        self.__last_fetched = time.time()
        self.__posts = [Post(**post_data) for post_data in response.json()]
        self.__user_posts_dict = defaultdict(list)
        for post in self.__posts:
            self.__user_posts_dict[post.user_id].append(post)
        self.__user_posts_dict = dict(self.__user_posts_dict)


posts_cache = PostsCache()
