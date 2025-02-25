import React from 'react';
import { Card } from 'react-bootstrap';
import { User } from '../../types';
import TagCloud from './TagCloud';
import Podium from './Podium';
import LoadingSpinner from '../common/LoadingSpinner';
import { useFetchSummary } from '../../hooks';
import styles from './styles/SummaryPage.module.css';

type SummaryPanelProps = {
  users: User[];
};

const SummaryPanel: React.FC<SummaryPanelProps> = ({ users }) => {
  const { summary, loading } = useFetchSummary();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (summary === null) {
    return null;
  }

  return (
    <div className={styles.summaryContainer}>
      <Card className={styles.leaderboardCard}>
        <Card.Body>
          <Card.Title> Leaderboard </Card.Title>
          <Card.Text>
            The top 3 users with the most unique words accross all their posts.
          </Card.Text>
          <Podium
            users={users}
            usersWithMostUniqueWords={summary.usersWithMostUniqueWords}
          />
        </Card.Body>
      </Card>

      <Card className={styles.commonWords}>
        <Card.Body>
          <Card.Title> Common Words </Card.Title>
          <Card.Text>
            Tag cloud showing common words used by all the users.
          </Card.Text>
          <TagCloud tags={summary.mostFrequentWords} />
        </Card.Body>
      </Card>
    </div>
  );
};

export default SummaryPanel;
