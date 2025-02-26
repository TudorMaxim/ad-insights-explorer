import { fetcher } from '../../utils';
import mockData from './mockData.json';

export const mockFetcher = () => {
  jest.mock('../../utils/fetcher', () => ({
    __esModule: true,
  }));

  fetcher.fetchUsers = jest
    .fn()
    .mockImplementation(() => Promise.resolve(mockData.users));

  fetcher.fetchAnomalies = jest
    .fn()
    .mockImplementation(() => Promise.resolve(mockData.anomalies));

  fetcher.fetchSummary = jest
    .fn()
    .mockImplementation(() => Promise.resolve(mockData.summary));

  fetcher.fetchPosts = jest
    .fn()
    .mockImplementation(() => Promise.resolve(mockData.posts));
};
