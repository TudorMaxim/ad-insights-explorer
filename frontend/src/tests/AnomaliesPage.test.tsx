import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { mockFetcher } from './__mocks__/fetcher';
import mockData from './__mocks__/mockData.json';
import AnomaliesPage from '../components/anomalies/AnomaliesPage';

describe('Test anomalies page component', () => {
  beforeEach(() => {
    mockFetcher();
  });

  test('anomalies panel', async () => {
    render(<AnomaliesPage />);
    const loader = screen.getByText('Loading...');
    expect(loader).toBeInTheDocument();
    await waitForElementToBeRemoved(loader);
    expect(screen.getByText('User ID')).toBeInTheDocument();
    expect(screen.getByText('Post ID')).toBeInTheDocument();
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Search by user ID')
    ).toBeInTheDocument();
  });

  test('anomalies table', async () => {
    const { container } = render(<AnomaliesPage />);
    const loader = screen.getByText('Loading...');
    expect(loader).toBeInTheDocument();
    await waitForElementToBeRemoved(loader);

    const tableRows = container.getElementsByTagName('tr');

    expect(tableRows.length).toBe(mockData.posts.posts.length + 1); // including header;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
});
