import { render, screen, fireEvent } from '@testing-library/react';
import { mockFetcher } from './__mocks__/fetcher';
import App from '../components/App';
import { act } from 'react';

describe('Test main app component', () => {
  beforeEach(() => {
    mockFetcher();
    render(<App />);
  });

  test('Header is rendered', () => {
    expect(screen.getByText('Ad Insights Explorer')).toBeInTheDocument();
  });

  test('Test tabs', async () => {
    const anomaliesTab = screen.getByText('Anomalies');
    const summaryTab = screen.getByText('Summary');

    expect(anomaliesTab).toBeInTheDocument();
    expect(summaryTab).toBeInTheDocument();

    act(() => fireEvent.click(anomaliesTab));
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
});
