import React from 'react';
import { Badge, Table } from 'react-bootstrap';
import { useFetchAnomalies } from '../../hooks';
import { flagPost } from '../../utils';
import { Post } from '../../types';
import classNames from 'classnames';
import styles from './styles/AnomaliesTable.module.css';

type AnomaliesTableProps = {
  posts: Post[];
};

type SortConfig = {
  key?: keyof Post;
  direction: string;
};

const AnomaliesTable: React.FC<AnomaliesTableProps> = ({ posts }) => {
  const [sortConfig, setSortConfig] = React.useState<SortConfig>({
    key: undefined,
    direction: 'asc',
  });
  const { anomalies } = useFetchAnomalies();

  const handleSort = (key: keyof Post) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const sortedPosts = posts.sort((x, y) => {
    if (!sortConfig.key) {
      return 0;
    }
    const key = sortConfig.key;

    if (x[key] < y[key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (x[key] > y[key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const renderArrow = () => (
    <i
      className={classNames('fa', styles.arrow, {
        ['fa-long-arrow-down']: sortConfig.direction === 'desc',
        ['fa-long-arrow-up']: sortConfig.direction === 'asc',
      })}
    ></i>
  );

  return (
    <Table>
      <thead>
        <tr>
          <th onClick={() => handleSort('userId')}>
            <span className={styles.sortable}>User ID</span>
            {sortConfig.key === 'userId' && renderArrow()}
          </th>
          <th onClick={() => handleSort('id')}>
            <span className={styles.sortable}> Post ID</span>
            {sortConfig.key === 'id' && renderArrow()}
          </th>
          <th onClick={() => handleSort('title')}>
            <span className={styles.sortable}> Title </span>
            {sortConfig.key === 'title' && renderArrow()}
          </th>
          <th> Anomalies </th>
        </tr>
      </thead>
      <tbody>
        {sortedPosts.map((post) => {
          const reasons = flagPost(post, anomalies);
          return (
            <tr key={`anomalies-table-post-${post.id}`}>
              <td> {post.userId} </td>
              <td> {post.id} </td>
              <td> {post.title} </td>
              <td>
                {reasons.map((reason, idx) => (
                  <Badge bg="danger" key={`post-${post.id}-reason-${idx}`}>
                    {reason}
                  </Badge>
                ))}
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default AnomaliesTable;
