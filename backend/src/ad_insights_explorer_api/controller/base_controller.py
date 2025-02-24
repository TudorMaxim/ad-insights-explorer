from collections import defaultdict
from typing import Callable, Dict, Iterable, TypeVar

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
        """
        frequency = defaultdict(int)
        for item in iterable:
            frequency[key(item)] += 1
        return dict(frequency)
