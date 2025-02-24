import React from 'react';
import { useFetchSummary } from '../hooks';
import styles from '../styles/SummaryPanel.module.css';
import { User } from '../types';
import LoadingSpinner from './LoadingSpinner';

type SummaryPanelProps = {
  users: User[];
};

const SummaryPanel: React.FC<SummaryPanelProps> = ({ users }) => {
  const { summary, loading, error } = useFetchSummary();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (summary === null) {
    return null;
  }

  return <div className={styles.container}>implement summary table</div>;
};

export default SummaryPanel;
