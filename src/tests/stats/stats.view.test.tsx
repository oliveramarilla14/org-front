import { testRender } from '@/helpers/testRender';
import StatsView from '@/views/stats/stats.view';
import { screen, waitFor } from '@testing-library/dom';

describe('Stats view', () => {
  beforeEach(() => {
    testRender(<StatsView />);
  });
  it('render correctly', async () => {
    screen.getByText('Estadísticas');

    const loading = screen.getByText('Cargando...');
    await waitFor(() => expect(loading).not.toBeInTheDocument());
    screen.getAllByRole('tab');
  });

  it('displays Goals tab initially', async () => {
    await waitFor(() => {
      expect(screen.getByText('Goles', { selector: 'th' })).toBeInTheDocument();
    });
  });

  // no funciona con click para revisar si cambia de tab
  // https://github.com/radix-ui/primitives/issues/2034
});
