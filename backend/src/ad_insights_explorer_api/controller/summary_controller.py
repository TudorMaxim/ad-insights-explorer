from typing import List, Tuple

from src.ad_insights_explorer_api.repository import PostsCache

from .base_controller import BaseController


class SummaryController(BaseController):
    """
    Controller class which processes the words used in posts

    Attributes:
        posts_cache (PostsCache): chache used to retrieve posts.
    """

    def __init__(self, posts_cache: PostsCache):
        super().__init__()
        self.__posts_cache = posts_cache

    def most_frequent_words(self) -> List[Tuple[str, int]]:
        """
        Function that computes the most frequently used words accross all posts.

        Returns:
            List[Tuple[str, int]]: a list of words and their frequencies sorted in decreasing order.
        """
        posts = self.__posts_cache.get()
        titles = list(map(lambda post: post.title, posts))
        return self.__compute_word_frequencies(titles, reverse=True)

    def users_with_most_unique_words(self) -> List[Tuple[int, int]]:
        """
        Function that computes the most frequently used words accross all posts.

        Returns:
            List[Tuple[int, int]]: a list of user IDs and their numbers of unique words sorted in decreasing order.
        """
        user_posts = self.__posts_cache.get_user_posts_dict()

        res: List[Tuple[int, int]] = []
        for user_id, posts in user_posts.items():
            titles = list(map(lambda post: post.title, posts))
            all_words = self.__compute_word_frequencies(titles)
            unique_words = list(filter(lambda tuple: tuple[1] == 1, all_words))
            res.append((user_id, len(unique_words)))

        return sorted(res, key=lambda tuple: tuple[1], reverse=True)

    def __compute_word_frequencies(
        self, titles: List[str], reverse=False
    ) -> List[Tuple[str, int]]:
        """
        Function that computes the frequency of each word from a list of titles.

        Args:
            titles (List[str]): list of titles from which words will be extracted.
            reverse (bool): flag to decide if the result should be sorted in ascending or descending order.
        """
        words = self._split_multiple(titles)
        frequency = self._get_frequency_dict(words, key=lambda word: word)
        res = []
        for key, value in frequency.items():
            res.append((key, value))

        return sorted(res, key=lambda tuple: tuple[1], reverse=reverse)
