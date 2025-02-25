import React from 'react';
import { Table } from 'react-bootstrap';
import AnomaliesPanel from './AnomaliesPanel';
import Pagination from './Pagination';
import LoadingSpinner from '../common/LoadingSpinner';
import { useFetchPosts } from '../../hooks';
import styles from './styles/AnomaliesPage.module.css';

const AnomaliesPage = () => {
  const [userId, setUserId] = React.useState<string>('');
  const [page, setPage] = React.useState<string>('1');
  const [pageSize, setPageSize] = React.useState<string>('10');

  const { posts, totalPages, loading } = useFetchPosts({
    userId,
    page,
    pageSize,
  });

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
          </tr>
        </thead>
        <tbody>
          {posts.map(({ userId, id, title }) => (
            <tr key={`anomalies-table-post-${id}`}>
              <td> {userId} </td>
              <td> {id} </td>
              <td> {title} </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination totalPages={totalPages} page={page} setPage={setPage} />
    </div>
  );
};

export default AnomaliesPage;
