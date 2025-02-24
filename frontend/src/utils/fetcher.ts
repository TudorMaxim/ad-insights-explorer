import type { User, Post, Summary } from '../types';

type FetchPostsParams = {
  userId?: number | null;
  page?: number | null;
  pageSize?: number | null;
};

class Fetcher {
  async fetchUsers(): Promise<User[]> {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!response.ok) {
      throw new Error('Error: we could not access the users data.');
    }
    const data: User[] = await response.json();
    return data;
  }

  async fetchSummary() {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/summary/`);
    if (!response.ok) {
      throw new Error('Error: we could not access the summary data.');
    }
    const data: Summary = await response.json();
    return data;
  }

  async fetchPosts({
    userId,
    page,
    pageSize,
  }: FetchPostsParams): Promise<Post[]> {
    return []; // TODO: implement this
  }
}

const fetcher = new Fetcher();

export default fetcher;
