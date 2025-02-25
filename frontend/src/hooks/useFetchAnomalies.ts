import React from 'react';
import { Anomalies } from '../types';
import { fetcher } from '../utils';

type AnomaliesState = {
  anomalies: Anomalies;
  loading: boolean;
  error: string | null;
};

const useFetchAnomalies = () => {
  const [anomalies, setAnomalies] = React.useState<Anomalies | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchAnomalies = async () => {
      try {
        const data: Anomalies = await fetcher.fetchAnomalies();
        setAnomalies(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnomalies();
  }, []);

  return { anomalies, loading, error };
};

export default useFetchAnomalies;
