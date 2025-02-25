import React from 'react';
import type { User, UserUniqueWords, PodiumUser } from '../types';
import styles from '../styles/Podium.module.css';

const getPodium = (users: User[], usersUniqueWords: UserUniqueWords[]) => {
  const podium: PodiumUser[] = [];
  const reordered = [
    usersUniqueWords[1],
    usersUniqueWords[0],
    usersUniqueWords[2],
  ];
  for (let i = 0; i < reordered.length; i++) {
    const idx = users.map((user) => user.id).indexOf(reordered[i].userId);
    podium.push({
      ...reordered[i],
      name: users[idx].name,
    });
  }
  return podium;
};

type PodiumProps = {
  users: User[];
  usersWithMostUniqueWords: UserUniqueWords[];
};

const Podium: React.FC<PodiumProps> = ({ users, usersWithMostUniqueWords }) => {
  const podium = getPodium(users, usersWithMostUniqueWords);
  const heightDiffs = [25, 50, 0];
  const colors = ['silver', 'gold', '#FF5733'];
  return (
    <div className={styles.podium}>
      {podium.map((user, idx) => (
        <div key={`podium-user-names-${idx}`} className={styles.podiumColumn}>
          <div className={styles.userPodiumCard}>
            <i
              className="fa-solid fa-medal"
              style={{ color: `${colors[idx]}` }}
            ></i>
            <span>{user.name}</span>
          </div>
          <div
            className={styles.podiumStand}
            style={{
              height: `${heightDiffs[idx] + 75}px`,
              backgroundColor: colors[idx],
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default Podium;
