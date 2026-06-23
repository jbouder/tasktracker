import { render, screen } from '@testing-library/react';
import Home from './Home';

describe('Home', () => {
  it('renders welcome heading', () => {
    render(<Home />);
    expect(
      screen.getByRole('heading', { name: /welcome/i }),
    ).toBeInTheDocument();
  });
});
