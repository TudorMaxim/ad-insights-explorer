import React from 'react';
import { TagFrequency } from '../types';
import styles from '../styles/TagCloud.module.css';

type TagCloudProps = {
  tags: TagFrequency[];
};

const getFontSize = (count: number) => `${4 + count * 4}px`;
const getLineHeight = (count: number) => `${8 + count * 2}px`;
const getRandomColor = () => `hsl(${Math.random() * 360}, 70%, 60%)`;
const getRandomRotation = () => `${Math.random() * 20 - 10}deg`;

const reordered = (tags: TagFrequency[]): TagFrequency[] => {
  let res: TagFrequency[] = [];
  for (let i = 0; i < tags.length; i += 2) {
    res.push(tags[i]);
  }
  res = res.reverse();
  for (let i = 1; i < tags.length; i += 2) {
    res.push(tags[i]);
  }
  return res;
};

const TagCloud: React.FC<TagCloudProps> = ({ tags }) => (
  <div className={styles.container}>
    {reordered(tags).map((tag, index) => (
      <span
        key={index}
        className={styles.tag}
        style={{
          fontSize: getFontSize(tag.count),
          color: getRandomColor(),
          transform: `rotate(${getRandomRotation()})`,
          lineHeight: getLineHeight(tag.count),
        }}
      >
        {tag.word}
      </span>
    ))}
  </div>
);

export default TagCloud;
