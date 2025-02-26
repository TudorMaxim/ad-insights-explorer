import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { mockFetcher } from './__mocks__/fetcher';
import mockData from './__mocks__/mockData.json';
import SummaryPage from '../components/summary/SummaryPage';

describe('Test summary page component', () => {
  beforeEach(() => {
    mockFetcher();
    render(<SummaryPage users={mockData.users} />);
  });

  test('summary page', async () => {
    const loader = screen.getByText('Loading...');
    expect(loader).toBeInTheDocument();
    await waitForElementToBeRemoved(loader);
    expect(screen.getByText('Leaderboard')).toBeInTheDocument();
    expect(screen.getByText('Common Words')).toBeInTheDocument();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
});
