import React from 'react';
import { Table, Badge } from 'react-bootstrap';
import AnomaliesPanel from './AnomaliesPanel';
import Pagination from './Pagination';
import LoadingSpinner from '../common/LoadingSpinner';
import { useFetchPosts, useFetchAnomalies } from '../../hooks';
import styles from './styles/AnomaliesPage.module.css';
import flagPost from '../../utils/flagPost';

const AnomaliesPage = () => {
  const [userId, setUserId] = React.useState<string>('');
  const [page, setPage] = React.useState<string>('1');
  const [pageSize, setPageSize] = React.useState<string>('10');

  const { posts, totalPages, loading } = useFetchPosts({
    userId,
    page,
    pageSize,
  });
  const { anomalies } = useFetchAnomalies();

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

      <Table>
        <thead>
          <tr>
            <th> User ID </th>
            <th> Post ID </th>
            <th> Title </th>
            <th> Anomalies </th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => {
            const reasons = flagPost(post, anomalies);
            return (
              <tr key={`anomalies-table-post-${post.id}`}>
                <td> {post.userId} </td>
                <td> {post.id} </td>
                <td> {post.title} </td>
                <td>
                  {reasons.map((reason, idx) => (
                    <Badge bg="danger" key={`post-${post.id}-reason-${idx}`}>
                      {' '}
                      {reason}{' '}
                    </Badge>
                  ))}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Pagination totalPages={totalPages} page={page} setPage={setPage} />
    </div>
  );
};

export default AnomaliesPage;
