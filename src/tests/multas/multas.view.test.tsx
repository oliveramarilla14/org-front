import { testRender } from '@/helpers/testRender';
import { screen, waitFor } from '@testing-library/dom';
import MultasView from '@/views/multas/multas.view';

describe('Multas View', () => {
  beforeEach((test) => {
    if (test.task.name != 'show toaster error') testRender(<MultasView />);
  });

  it('render correctly', () => {
    expect(screen.getByText('Pagos')).toBeInTheDocument();
  });
  it('show loading screen', () => {
    expect(screen.getByText('Cargando...')).toBeInTheDocument();
  });

  it('loading disappears on load', async () => {
    const loading = screen.getByText('Cargando...');
    await waitFor(() => {
      expect(loading).not.toBeInTheDocument();
    });
  });
});
