import functools
import re
from typing import Dict, List, Tuple

from src.ad_insights_explorer_api.model import Post


class SummaryController:
    """
    Controller class which processes the words used in posts

    Attributes:
        posts (List[Post]): Stores the list of posts.
    """

    def __init__(self, posts: List[Post]):
        self.posts = posts

    def most_frequent_words(self) -> List[Tuple[str, int]]:
        """
        Function that computes the most frequently used words accross all posts.

        Returns:
            List[Tuple[str, int]]: a list of words and their frequencies sorted in decreasing order.
        """
        titles = list(map(lambda post: post.title, self.posts))
        return self.__compute_word_frequencies(titles, reverse=True)

    def users_with_most_unique_words(self) -> List[Tuple[int, int]]:
        """
        Function that computes the most frequently used words accross all posts.

        Returns:
            List[Tuple[int, int]]: a list of user IDs and their numbers of unique words sorted in decreasing order.
        """
        user_posts: Dict[int, List[Post]] = {}
        for post in self.posts:
            if user_posts.get(post.user_id):
                user_posts[post.user_id].append(post)
            else:
                user_posts[post.user_id] = [post]

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
        separators = r"[ ,:;.?!\n]"
        words = functools.reduce(
            lambda acc, title: acc + list(filter(None, re.split(separators, title))),
            titles,
            [],
        )
        frequency: Dict[str, int] = {}
        for word in words:
            if frequency.get(word):
                frequency[word] += 1
            else:
                frequency[word] = 1

        res = []
        for key, value in frequency.items():
            res.append((key, value))

        return sorted(res, key=lambda tuple: tuple[1], reverse=reverse)
