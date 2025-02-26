import React from 'react';
import { Tabs, Tab, Container } from 'react-bootstrap';
import AnomaliesPage from './anomalies/AnomaliesPage';
import SummaryPage from './summary/SummaryPage';
import ProtectedMediaIcon from '../assets/ProtectedMediaIcon.webp';
import { useFetchUsers } from '../hooks';
import styles from './styles/App.module.css';

const App: React.FC = () => {
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
              <AnomaliesPage />
            </Tab>
            <Tab eventKey="summary" title="Summary">
              <SummaryPage users={users} />
            </Tab>
          </Tabs>
        </Container>
      </main>
    </>
  );
};

export default App;
