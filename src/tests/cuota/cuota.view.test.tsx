import { testRender } from '@/helpers/testRender';
import { screen, waitFor } from '@testing-library/dom';
import CuotasView from '@/views/Cuotas/cuotas.view';
import { cuotasEmpty, cuotasError } from '../mocks/uriHandlers/cuotasHandlers';
import { server } from '../mocks/server';

describe('Club View', () => {
  beforeEach((test) => {
    if (test.task.name != 'show toaster error') testRender(<CuotasView />);
  });

  it('render correctly', () => {
    expect(screen.getByText('Cuotas')).toBeInTheDocument();
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

  it('handle undefined data', async () => {
    server.use(cuotasEmpty);
    testRender(<CuotasView />);
    await screen.findByText(/No existen registros de cuotas./i);
  });

  it('show toaster on error', async () => {
    server.use(cuotasError);
    testRender(<CuotasView />);
    await screen.findByText(/error indefinido/i);
  });
});
