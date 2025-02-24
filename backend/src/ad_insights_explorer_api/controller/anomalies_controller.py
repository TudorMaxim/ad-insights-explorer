from typing import List, Tuple

from config import Config
from src.ad_insights_explorer_api.model import Post
from src.ad_insights_explorer_api.repository import PostsCache

from .base_controller import BaseController


class AnomaliesController(BaseController):
    """
    Controller class which processes the titles of posts and detects anomalies.

    Attributes:
        posts_cache (PostsCache): chache used to retrieve posts.
    """

    def __init__(self, posts_cache: PostsCache):
        super().__init__()
        self.__posts_cache = posts_cache

    def title_too_short(self) -> List[Post]:
        """
        Function that looks for posts having the title too short. The leghts of the title is compared with a configurable threshold, which by default is set to 15.

        Returns:
            List[Post]: a list of posts having the title too short.
        """
        posts = self.__posts_cache.get()
        return list(
            filter(lambda post: len(post.title) < Config.POSTS_MIN_TITLE_LENGTH, posts)
        )

    def duplicate_titles(self) -> List[Tuple[Post, int]]:
        """
        Function that looks for posts from the same user with duplicate titles.

        Returns:
            List[Tuple[Post, int]]: a list of duplicate posts including the number of times the same title was used.
        """
        posts = self.__posts_cache.get()
        frequency = self._get_frequency_dict(
            posts, key=lambda post: (post.user_id, post.title)
        )
        return list(
            map(
                lambda post: (post, frequency[(post.user_id, post.title)]),
                filter(lambda post: frequency[(post.user_id, post.title)] > 1, posts),
            )
        )

    def too_many_similar_titles(self) -> List[int]:
        pass
