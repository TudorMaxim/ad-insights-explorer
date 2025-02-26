import { Anomalies, Post } from '../types';

export enum FlagingReason {
  DUPLICATE = 'Duplicate',
  TOO_SHORT = 'Too short',
  SIMILAR = 'Similar',
}

const flagPost = (post: Post, anomalies: Anomalies | null) => {
  const reasons: FlagingReason[] = [];
  if (anomalies === null) {
    return reasons;
  }
  if (anomalies.shortTitlePosts.map((post) => post.id).includes(post.id)) {
    reasons.push(FlagingReason.TOO_SHORT);
  }
  if (anomalies.duplicateTitlePosts.map((post) => post.id).includes(post.id)) {
    reasons.push(FlagingReason.DUPLICATE);
  }

  const idx = anomalies.usersTooManySimilarTitles
    .map((item) => item.userId)
    .indexOf(post.userId);
  if (idx > -1) {
    const similarPosts = anomalies.usersTooManySimilarTitles[idx].posts;
    if (similarPosts.map((post) => post.id).includes(post.id)) {
      reasons.push(FlagingReason.SIMILAR);
    }
  }

  return reasons;
};

export default flagPost;
