from typing import Dict, List, Tuple

from config import Config
from src.ad_insights_explorer_api.model import Post


class AnomaliesController:
    """
    Controller class which processes the titles of posts and detects anomalies

    Attributes:
        posts (List[Post]): Stores the list of posts.
    """

    def __init__(self, posts: List[Post]):
        self.posts = posts

    def title_too_short(self) -> List[Post]:
        """
        Function that looks for posts having the title too short. The leghts of the title is compared with a configurable threshold, which by default is set to 15.

        Returns:
            List[Post]: a list of posts having the title too short.
        """
        return list(
            filter(
                lambda post: len(post.title) < Config.POSTS_MIN_TITLE_LENGTH, self.posts
            )
        )

    def duplicate_titles(self) -> List[Tuple[Post, int]]:
        """
        Function that looks for posts from the same user with duplicate titles.

        Returns:
            List[Tuple[Post, int]]: a list of duplicate posts including the number of times the same title was used.
        """
        frequency: Dict[Tuple[int, str], int] = {}
        for post in self.posts:
            if frequency.get((post.user_id, post.title)):
                frequency[(post.user_id, post.title)] += 1
            else:
                frequency[(post.user_id, post.title)] = 1

        return list(
            map(
                lambda post: (post, frequency[(post.user_id, post.title)]),
                filter(
                    lambda post: frequency[(post.user_id, post.title)] > 1, self.posts
                ),
            )
        )

    def too_many_similar_titles(self) -> List[int]:
        pass
