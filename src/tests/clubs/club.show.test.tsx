import { testRender } from '@/helpers/testRender';
import ClubShow from '@/views/clubs/club.show';
import { screen } from '@testing-library/dom';
import { server } from '../mocks/server';
import { ClubError, clubEmpty } from '../mocks/uriHandlers/clubsHandlers';

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
    server.use(ClubError);
    testRender(<ClubShow />);

    await screen.findByText('500 - Error Indefinido');
  });

  it('handle undefined data', async () => {
    server.use(clubEmpty);
    testRender(<ClubShow />);
  });
});
