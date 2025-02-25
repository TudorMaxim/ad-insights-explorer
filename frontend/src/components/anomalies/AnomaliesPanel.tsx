import React from 'react';
import classNames from 'classnames';
import { Stack, InputGroup, Form, Button } from 'react-bootstrap';
import styles from './styles/AnomaliesPanel.module.css';

type AnomaliesPanelProps = {
  userId: string;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
  page: string;
  setPage: React.Dispatch<React.SetStateAction<string>>;
  pageSize: string;
  setPageSize: React.Dispatch<React.SetStateAction<string>>;
};

const AnomaliesPanel: React.FC<AnomaliesPanelProps> = ({
  userId,
  setUserId,
  page,
  setPage,
  pageSize,
  setPageSize,
}) => {
  const [settingsVisible, setSettingsVisible] = React.useState(false);
  return (
    <>
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
    </>
  );
};

export default AnomaliesPanel;
