import React from 'react';
import classNames from 'classnames';
import {
  Table,
  Form,
  Button,
  InputGroup,
  Dropdown,
  Stack,
} from 'react-bootstrap';
import LoadingSpinner from './LoadingSpinner';
import { useFetchPosts } from '../hooks';
import styles from '../styles/AnomaliesTable.module.css';

const AnomaliesTable = () => {
  const [userId, setUserId] = React.useState<string>('');
  const [page, setPage] = React.useState<string>('');
  const [pageSize, setPageSize] = React.useState<string>('');
  const [settingsVisible, setSettingsVisible] = React.useState(false);

  const { posts, totalPages, loading } = useFetchPosts({
    userId,
    page,
    pageSize,
  });

  return (
    <div className={styles.anomaliesContainer}>
      <div className={styles.anomaliesPanel}>
        <InputGroup className={classNames('mb-3', styles.search)}>
          <Form.Control
            type="number"
            min={1}
            placeholder="Search by user ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
          <InputGroup.Text>
            <i className="fa fa-search"></i>
          </InputGroup.Text>
        </InputGroup>

        <Button
          variant="outline-secondary"
          className="mb-3"
          onClick={() => setSettingsVisible(!settingsVisible)}
        >
          <span> Settings </span>
          <i className="fa fa-cog"></i>
        </Button>
      </div>
      {settingsVisible && (
        <Stack className={styles.settings}>
          <span
            className={styles.close}
            onClick={() => setSettingsVisible(false)}
          >
            <i className="fa fa-close"></i>
          </span>
          <InputGroup className={classNames('mb-3', styles.pageSettings)}>
            <InputGroup.Text>Page</InputGroup.Text>
            <Form.Control
              type="number"
              min={1}
              placeholder="Check for a specific page"
              value={page}
              onChange={(e) => {
                setPage(e.target.value);
                if (e.target.value === '') {
                  setPageSize('');
                }
              }}
            />
          </InputGroup>
          <InputGroup className={classNames('mb-3', styles.pageSettings)}>
            <InputGroup.Text>Page Size</InputGroup.Text>
            <Form.Control
              type="number"
              min={1}
              placeholder="Change page size"
              value={pageSize}
              disabled={page === ''}
              onChange={(e) => setPageSize(e.target.value)}
            />
          </InputGroup>
        </Stack>
      )}
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

      <div className="d-flex justify-content-between align-items-center">
        <Button
          variant="outline-secondary"
          disabled={page === '' || page == '1'}
          onClick={() => setPage((prev) => `${parseInt(prev) - 1}`)}
        >
          <i className="fa fa-arrow-left" aria-hidden="true"></i>Previous
        </Button>
        <span>
          Page {page || '1'} of {totalPages}{' '}
        </span>
        <Button
          variant="outline-secondary"
          disabled={parseInt(page || '1') === totalPages}
          onClick={() => setPage((prev) => `${parseInt(prev || '1') + 1}`)}
        >
          Next <i className="fa fa-arrow-right" aria-hidden="true"></i>
        </Button>
      </div>
    </div>
  );
};

export default AnomaliesTable;
