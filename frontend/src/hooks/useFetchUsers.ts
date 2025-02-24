import React from 'react';
import { fetcher } from '../utils';
import type { User } from '../types';

type UsersState = {
  users: User[];
  loading: boolean;
  error: string | null;
};

const useFetchUsers = (): UsersState => {
  const [users, setUsers] = React.useState<User[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await fetcher.fetchUsers();
        setUsers(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return { users, loading, error };
};

export default useFetchUsers;
