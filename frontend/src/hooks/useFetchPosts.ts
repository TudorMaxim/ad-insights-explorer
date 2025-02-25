import React from 'react';
import { FetchPostsParams, Post, PostsReponse } from '../types';
import { fetcher } from '../utils';

type FetchedPostsState = {
  posts: Post[];
  totalPages: number;
  loading: boolean;
  error: string | null;
};

const useFetchPosts = ({
  userId,
  page,
  pageSize,
}: FetchPostsParams): FetchedPostsState => {
  const [posts, setPosts] = React.useState<Post[]>([]);
  const [totalPages, setTotalPages] = React.useState(1);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data: PostsReponse = await fetcher.fetchPosts({
          userId,
          page,
          pageSize,
        });
        setPosts(data.posts);
        setTotalPages(data.totalPages);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [userId, page, pageSize, totalPages]);

  return { posts, totalPages, loading, error };
};

export default useFetchPosts;
