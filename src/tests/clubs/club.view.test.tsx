import { testRender } from '@/helpers/testRender';
import Clubs from '@/views/clubs/Clubs.view';
import { screen } from '@testing-library/dom';

describe('Club View', () => {
  beforeEach(() => {
    testRender(<Clubs />);
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
});
