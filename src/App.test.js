import { render, screen, waitFor, act } from '@testing-library/react';
import App from './App';

test('renders my reads homepage', () => {
  act(() => {
    render(<App />);
  });

  const title = screen.getByText(/^MyReads$/);
  const currentlyReading = screen.getByText(/^Currently reading$/);
  const wantsToRead = screen.getByText(/^Wants to read$/);
  const read = screen.getByText(/^Read$/);

  expect(title).toBeInTheDocument();
  expect(currentlyReading).toBeInTheDocument();
  expect(wantsToRead).toBeInTheDocument();
  expect(read).toBeInTheDocument();
});

test('renders books on homepage', async() => {
  act(() => {
    render(<App />);
  });
  await waitFor(() => {
    expect(screen.getByText(/The Linux Command Line/i)).toBeInTheDocument()
    expect(screen.getByText(/The Cuckoo's Calling/i)).toBeInTheDocument()
    expect(screen.getByText(/Needful Things/i)).toBeInTheDocument()
  })
});

// TODO - test book having its category changed

// TODO - test search button clicked

// TODO - test valid search term entered

// TODO - test invalid search term entered

// TODO - test search term cleared after entering valid term