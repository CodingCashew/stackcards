import { render, screen } from '@testing-library/react';
import DeckMenu from './DeckMenu';

it('renders the show back of card button', () => {
  render(<DeckMenu />);
  const buttonElement = screen.getByRole('button')
  expect(buttonElement).toBeInTheDocument();
})