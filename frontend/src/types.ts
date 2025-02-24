export type User = {
  id: number;
  name: string;
};

export type Post = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

type WordFrequency = {
  count: number;
  word: string;
};

type UserUniqueWords = {
  userId: number;
  count: number;
};

export type Summary = {
  mostFrequentWords: WordFrequency[];
  usersWithMostUniqueWords: UserUniqueWords[];
};
