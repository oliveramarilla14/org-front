import Loading from '@/Layouts/Loading';
import { testRender } from '@/helpers/testRender';
import { screen } from '@testing-library/react';

describe('Loading Component Layout', () => {
  it('renders Loading component correctly', () => {
    testRender(<Loading />);

    expect(screen.getByText(/Cargando/i)).toBeInTheDocument();

    expect(screen.getByRole('status')).toBeInTheDocument();
  });
});
