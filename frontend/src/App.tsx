import React from 'react';
import { Tabs, Tab, Container } from 'react-bootstrap';
import { AnomaliesTable, SummaryPanel } from './components';
import { useFetchUsers } from './hooks';
import ProtectedMediaIcon from './assets/ProtectedMediaIcon.webp';
import styles from './styles/App.module.css';

function App() {
  const { users } = useFetchUsers();
  return (
    <>
      <header className={styles.header}>
        <img
          className={styles.headerImage}
          src={ProtectedMediaIcon}
          alt="protected-media-icon"
        ></img>
        <h1>Ad Insights Explorer</h1>
      </header>
      <main>
        <Container className={styles.mainContainer}>
          <Tabs defaultActiveKey="anomalies" id="dasboard-tabs">
            <Tab eventKey="anomalies" title="Anomalies">
              <AnomaliesTable />
            </Tab>
            <Tab eventKey="summary" title="Summary">
              <SummaryPanel users={users} />
            </Tab>
          </Tabs>
        </Container>
      </main>
    </>
  );
}

export default App;
