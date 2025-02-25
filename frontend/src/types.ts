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

export type FetchPostsParams = {
  userId: string;
  page: string;
  pageSize: string;
};

export type PostsReponse = {
  posts: Post[];
  totalPages: number;
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

export type Anomalies = {
  duplicateTitlePosts: Post[];
  shortTitlePosts: Post[];
  usersTooManySimilarTitles: {
    userId: number;
    posts: Post[];
  }[];
};
