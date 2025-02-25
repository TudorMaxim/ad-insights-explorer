import type {
  User,
  Post,
  Summary,
  PostsReponse,
  FetchPostsParams,
} from '../types';

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
  }: FetchPostsParams): Promise<PostsReponse> {
    const urlParams: string = this.buildUrlParams({ userId, page, pageSize });
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/posts/${urlParams}`
    );
    if (!response.ok) {
      throw new Error('Error: we could not access the posts data.');
    }
    const data: PostsReponse = await response.json();
    return data;
  }

  buildUrlParams(params: FetchPostsParams): string {
    let urlParams = '';
    let separator = '';
    const filteredParams = Object.fromEntries(
      Object.entries(params).filter(([_, value]) => value !== '')
    );

    if (Object.keys(filteredParams).length == 0) {
      return urlParams;
    }

    urlParams += '?';
    for (const key in filteredParams) {
      urlParams += separator + `${key}=${filteredParams[key]}`;
      separator = '&';
    }
    return urlParams;
  }
}

const fetcher = new Fetcher();

export default fetcher;
