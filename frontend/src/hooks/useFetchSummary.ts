import React from 'react';
import type { Summary } from '../types';
import { fetcher } from '../utils';

type SummaryState = {
  summary: Summary | null;
  loading: boolean;
  error: string | null;
};

const useFetchSummary = (): SummaryState => {
  const [summary, setSummary] = React.useState<Summary | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchSummary = async () => {
      try {
        const data: Summary = await fetcher.fetchSummary();
        setSummary(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  return { summary, loading, error };
};

export default useFetchSummary;
