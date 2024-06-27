import App from '@/App';
import { testRender } from '@/helpers/testRender';
import { cleanup, screen } from '@testing-library/react';

describe('App', () => {
  beforeEach(() => {
    testRender(<App />);
  });

  it('Render correctly', () => {
    expect(screen.getByText(/Fast Tournament/i)).toBeInTheDocument();
  });

  it('renders NotFound component on unknown route', () => {
    cleanup();
    testRender(<App />, '/no-existe');
    expect(screen.getByText(/Pagina no encontrada/i)).toBeInTheDocument();
  });
});
