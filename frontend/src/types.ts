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

export type TagFrequency = {
  count: number;
  word: string;
};

export type UserUniqueWords = {
  userId: number;
  count: number;
};

export type PodiumUser = UserUniqueWords & {
  name: string;
};

export type Summary = {
  mostFrequentWords: TagFrequency[];
  usersWithMostUniqueWords: UserUniqueWords[];
};
