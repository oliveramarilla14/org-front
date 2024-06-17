import { testRender } from '@/helpers/testRender';
import ClubShow from '@/views/clubs/club.show';
import { screen } from '@testing-library/dom';
import { server } from '../mocks/server';
import { ClubsError } from '../mocks/uriHandlers/clubsHandlers';

describe('Club show', () => {
  vi.mock('react-router-dom', async (importOriginal) => {
    const mod = await importOriginal<typeof import('react-router-dom')>();
    return {
      ...mod,
      useParams: () => ({
        id: 2
      })
    };
  });

  beforeEach((test) => {
    if (test.task.name !== 'Show error when fetch fails') {
      testRender(<ClubShow />);
    }
  });

  it('render correctly', () => {
    screen.getByText('Cargando...');
  });

  it('fetch the club by id', async () => {
    const loading = screen.getByText('Cargando...');
    expect(loading).toBeInTheDocument();

    expect(await screen.findByText('testing Club')).toBeInTheDocument();
    expect(loading).not.toBeInTheDocument();
  });

  it('Show error when fetch fails', async () => {
    server.use(ClubsError);
    testRender(<ClubShow />);

    await screen.findByText(/error indefinido/i);
  });
});