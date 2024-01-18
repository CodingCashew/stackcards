import { render, screen } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom';

it('renders the application title', () => {
  render(<App />);
  const titleElement = screen.getByText('Swedish Flashcards')
  expect(titleElement).toBeInTheDocument();
});

