import Positions from '@/views/Positions.view';
import { screen } from '@testing-library/react';
import { server } from '../mocks/server';
import { PositionError } from '../mocks/uriHandlers/positionsHandlers';
import { testRender } from '@/helpers/testRender';

describe('Positions Table View', () => {
  beforeEach((test) => {
    if (test.task.name !== 'Show error when fetch fails') {
      testRender(<Positions />);
    }
  });

  it('renders Correctly', () => {
    expect(screen.getByText('Tabla de posiciones')).toBeInTheDocument();
  });

  it('show the loading component on loading', async () => {
    expect(screen.getByText('Cargando...')).toBeInTheDocument();
  });

  it('show the table with data from the API', async () => {
    const loading = screen.getByText('Cargando...');
    expect(loading).toBeInTheDocument();

    expect(await screen.findByText('Interpod')).toBeInTheDocument();
    expect(loading).not.toBeInTheDocument();
  });

  it('Show error when fetch fails', async () => {
    server.use(PositionError);
    testRender(<Positions />);

    await screen.findByText(/error indefinido/i);
  });
});
