import functools
import re
from collections import defaultdict
from typing import Callable, Dict, Iterable, List, TypeVar

K = TypeVar("K")  # key type
T = TypeVar("T")  # input type


class BaseController:
    """
    Base controller for reusing common methods.
    """

    def _get_frequency_dict(
        self, iterable: Iterable[T], key: Callable[[T], K]
    ) -> Dict[K, int]:
        """
        Function that computes the frequency of a generic key in an iterable.

        Argumments:
            iterable (Iterable[T]): iterable of generic items
            key (Callable[[T], K]): function that maps and item to a key in the frequency dictionary

        Returns:
            Dict[K, int]: dictionary containing the frequency of each key.
        """
        frequency = defaultdict(int)
        for item in iterable:
            frequency[key(item)] += 1
        return dict(frequency)

    def _split_multiple(self, titles: List[str]) -> List[str]:
        """
        Function that splits multiple titles in a list of words.
        A word may appear more than once in the same title.

        Arguments:
            titles (List[str]): list of titles.

        Returns:
            List[str]: list of words within all titles.
        """
        return functools.reduce(
            lambda acc, title: acc + self._split(title),
            titles,
            [],
        )

    def _split_unique_per_item(self, titles: List[str]) -> List[str]:
        """
        Function that splits multiple titles in a list of words.
        For each title, a word appears only once if there are duplicates.

        Arguments:
            titles (List[str]): list of titles.

        Returns:
            List[str]: list of unique words within all titles.
        """
        return functools.reduce(
            lambda acc, title: acc + self._split_unique(title),
            titles,
            [],
        )

    def _split_unique(self, title: str) -> List[str]:
        """
        Function that splits a title in a list of words and eliminates duplicates.

        Arguments:
            title (str): title to be split.

        Returns:
            List[str]: list of unique words within the title.
        """
        return list(set(self._split(title)))

    def _split(self, title: str) -> List[str]:
        """
        Function that splits a title in a list of words.

        Arguments:
            title (str): title to be split.

        Returns:
            List[str]: list of words within the title.
        """
        separators = r"[ ,:;.?!\n]"
        return list(filter(None, re.split(separators, title)))

    def _avegare(self, values: List[int]) -> int:
        """
        Function that computes the average of values from a list.

        Arguments:
            value (List[int]): values to compute the average.

        Returns:
            int: the average.
        """
        return sum(values) / len(values)
