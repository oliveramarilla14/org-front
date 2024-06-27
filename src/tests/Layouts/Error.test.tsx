import Error from '@/Layouts/Error';
import { render, screen } from '@testing-library/react';

describe('Error Component', () => {
  it('renders correctly with the given message', () => {
    const errorMessage = 'This is a test error message';

    render(<Error message={errorMessage} />);

    expect(screen.getByText('Error!')).toBeInTheDocument();

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });
});
