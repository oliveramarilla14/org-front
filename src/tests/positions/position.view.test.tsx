import Positions from '@/views/Positions.view';
import { render, screen } from '@testing-library/react';
import { SWRConfig } from 'swr';
import { server } from '../mocks/server';
import { PositionError } from '../mocks/uriHandlers/positionsHandlers';

describe('Positions Table View', () => {
  beforeEach((test) => {
    if (test.task.name !== 'Show error when fetch fails') {
      render(
        <SWRConfig value={{ provider: () => new Map() }}>
          <Positions />
        </SWRConfig>
      );
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
    render(
      <SWRConfig value={{ provider: () => new Map() }}>
        <Positions />
      </SWRConfig>
    );

    await screen.findByText(/error indefinido/i);
  });
});
