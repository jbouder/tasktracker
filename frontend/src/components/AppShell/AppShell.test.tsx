import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '@/providers/ThemeProvider';
import AppShell from './AppShell';

function renderShell(initialEntry = '/') {
  return render(
    <ThemeProvider>
      <MemoryRouter initialEntries={[initialEntry]}>
        <AppShell>
          <div>Page content</div>
        </AppShell>
      </MemoryRouter>
    </ThemeProvider>,
  );
}

describe('AppShell', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders sidebar navigation and page content', () => {
    renderShell();

    expect(
      screen.getByRole('navigation', { name: 'Main' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /dashboard/i })).toHaveAttribute(
      'href',
      '/',
    );
    expect(screen.getByRole('link', { name: /projects/i })).toHaveAttribute(
      'href',
      '/projects',
    );
    expect(screen.getByText('Page content')).toBeInTheDocument();
  });

  it('collapses the sidebar', async () => {
    renderShell();

    await userEvent.click(
      screen.getByRole('button', { name: /collapse sidebar/i }),
    );

    expect(
      screen.getByRole('button', { name: /expand sidebar/i }),
    ).toHaveAttribute('aria-expanded', 'false');
  });

  it('shows the active page title in the header', () => {
    renderShell('/reports');

    expect(
      screen.getByRole('heading', { name: 'Reports' }),
    ).toBeInTheDocument();
  });
});
