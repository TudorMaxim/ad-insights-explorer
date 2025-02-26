import React from 'react';
import { Alert } from 'react-bootstrap';
import AnomaliesPanel from './AnomaliesPanel';
import AnomaliesTable from './AnomaliesTable';
import Pagination from './Pagination';
import LoadingSpinner from '../common/LoadingSpinner';
import { useFetchPosts } from '../../hooks';
import styles from './styles/AnomaliesPage.module.css';

const AnomaliesPage = () => {
  const [userId, setUserId] = React.useState<string>('');
  const [page, setPage] = React.useState<string>('1');
  const [pageSize, setPageSize] = React.useState<string>('100');

  const { posts, totalPages, loading, error } = useFetchPosts({
    userId,
    page,
    pageSize,
  });

  if (posts.length === 0 && loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <Alert variant="danger" className="mb-3 mt-3">
        {error}
      </Alert>
    );
  }

  return (
    <div className={styles.anomaliesContainer}>
      <AnomaliesPanel
        userId={userId}
        setUserId={setUserId}
        page={page}
        setPage={setPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
      />
      <AnomaliesTable posts={posts} />
      <Pagination totalPages={totalPages} page={page} setPage={setPage} />
    </div>
  );
};

export default AnomaliesPage;
