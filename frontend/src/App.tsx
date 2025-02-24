import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { AnomaliesTable, SummaryPanel } from './components';
import { useFetchUsers } from './hooks';
import styles from './styles/App.module.css';

function App() {
  const { users } = useFetchUsers();
  return (
    <main className={styles.container}>
      <Tabs defaultActiveKey="summary" id="dasboard-tabs">
        <Tab eventKey="summary" title="Summary">
          <SummaryPanel users={users} />
        </Tab>
        <Tab eventKey="anomalies" title="Anomalies">
          <AnomaliesTable />
        </Tab>
      </Tabs>
    </main>
  );
}

export default App;
