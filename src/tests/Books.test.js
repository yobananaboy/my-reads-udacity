import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

test('renders my reads homepage', () => {
  render(<App />);

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
  render(<App />);

  await waitFor(() => {
    expect(screen.getByText(/The Linux Command Line/i)).toBeInTheDocument()
  }, { timeout: 10000 })
  await waitFor(() => {
    expect(screen.getByText(/The Cuckoo's Calling/i)).toBeInTheDocument()
  }, { timeout: 10000 })

  await waitFor(() => {
    expect(screen.getByText(/Needful Things/i)).toBeInTheDocument()
  }, { timeout: 10000 })
});

test('book can have its category changed', async() => {
  render(<App />);
  
  await waitFor(() => {
    expect(screen.getByText(/The Linux Command Line/i)).toBeInTheDocument()
  }, { timeout: 10000 })

  let listbox = screen.getByText(/The Linux Command Line/i).parentElement.firstChild.querySelector('div[role="listbox"]');
  userEvent.click(listbox)
  let options = listbox.querySelector('.menu').children
  let read = options.item(2)
  userEvent.click(read)
  await waitFor(() => {
    listbox = screen.getByText(/The Linux Command Line/i).parentElement.firstChild.querySelector('div[role="listbox"]');
    expect(listbox.querySelector('div[role="alert"]').textContent).toBe("Read")
  }, { timeout: 5000 })
});