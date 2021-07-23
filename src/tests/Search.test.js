import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('searching for books works as expected', () => {
  test('user can click search button and get taken to search page', async() => {
    render(<App />);
    
    userEvent.click(screen.getByText(/Add a book/i))
  
    await waitFor(() => {
      expect(screen.getByRole('textbox', { name: 'search'})).toBeInTheDocument()
    })
  
  });
  
  
  test('user can enter a search term and be shown relevant books', async() => {
    render(<App />);
  
    expect(screen.getByRole('textbox', { name: 'search'})).toBeInTheDocument()
  
    await userEvent.type(screen.getByRole('textbox', { name: 'search'}), 'fantasy')

    await waitFor(() => {
      expect(screen.getByText('Geronimo Stilton')).toBeInTheDocument();
    }, { timeout: 10000 });

  }, 20000);
  
  test('invalid search term displays no results found message', async() => {
    render(<App />);

    expect(screen.getByRole('textbox', { name: 'search'})).toBeInTheDocument()
  
    await userEvent.clear(screen.getByRole('textbox', { name: 'search'}))
    await userEvent.type(screen.getByRole('textbox', { name: 'search'}), 'foo')
    
    await waitFor(() => {
      expect(screen.getByText(/No results found. Please try a different search term!/i)).toBeInTheDocument()
    }, { timeout: 10000 })
  
  }, 20000);
})