import React from 'react';
import { Spinner } from 'react-bootstrap';
import styles from '../styles/LoadingSpinner.module.css';

const LoadingSpinner: React.FC = () => (
  <div className={styles.loadingContainer}>
    <Spinner
      animation="border"
      variant="primary"
      role="status"
      className={styles.spinner}
    >
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  </div>
);

export default LoadingSpinner;
