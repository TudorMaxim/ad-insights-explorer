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
        """
        Function that checks for users with similar titles in their posts.
        Two titles are considered similar if the number of common words they use exceed a threshold.

        Returns:
            List[int]: a list of user IDs that have similar titles for their posts.
        """
        user_posts = self.__posts_cache.get_user_posts_dict()
        res = []
        for user_id, posts in user_posts.items():
            if self.__has_too_many_similar_titles(posts):
                res.append(user_id)
        return res

    def __has_too_many_similar_titles(self, posts: List[Post]):
        """
        Function that checks if the posts of an user have similar titles.
        Two titles are considered similar if the number of common words they use exceeds a third of the averege number of words in a title.
        Each word is mapped to the number of titles using it and the number of common words is incremented every time a word is found in more titles (configurable threshold).

        Arguments:
            posts (List[Post]): A list containing the posts of a user.

        Returns:
            List[int]: a list of user IDs that have similar titles for their posts.
        """
        titles = list(map(lambda post: post.title, posts))
        threshold = (
            self._avegare(list(map(lambda title: len(self._split(title)), titles))) // 3
        )
        all_words = self._split_unique_per_item(titles)
        all_words_hash = self._get_frequency_dict(all_words, key=lambda word: word)
        similar_count = 0

        for title in titles:
            common_words_count = 0

            for word in self._split_unique(title):
                if (
                    all_words_hash[word] > Config.USER_POSTS_SIMILAR_TITLE_THRESHOLD
                ):  # if word appears in at least 5 more titles
                    common_words_count += 1

            if common_words_count > threshold:
                similar_count += 1

            if similar_count >= Config.USER_POSTS_SIMILAR_TITLE_THRESHOLD:
                return True

        return False
