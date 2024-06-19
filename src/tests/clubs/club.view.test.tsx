import { testRender } from '@/helpers/testRender';
import Clubs from '@/views/clubs/Clubs.view';
import { screen } from '@testing-library/dom';
import { server } from '../mocks/server';
import { ClubsError, clubsEmpty } from '../mocks/uriHandlers/clubsHandlers';

describe('Club View', () => {
  beforeEach((test) => {
    if (test.task.name != 'show toaster error') testRender(<Clubs />);
  });

  it('render correctly', () => {
    expect(screen.getByText('Equipos')).toBeInTheDocument();
  });
  it('show loading screen', () => {
    expect(screen.getByText('Cargando...')).toBeInTheDocument();
  });

  it('show Teams on cards', async () => {
    const text = await screen.findByText('Interpod');
    expect(text).toBeInTheDocument();
  });

  it('show toaster on error', async () => {
    server.use(ClubsError);
    testRender(<Clubs />);
    await screen.findByText(/error indefinido/i);
  });

  it('handle undefined data', async () => {
    server.use(clubsEmpty);
    testRender(<Clubs />);

    expect(await screen.findByText('No existen equipos registrados')).toBeInTheDocument();
  });
});
