import ClubForm from '@/components/views/clubs/ClubForm';
import { testRender } from '@/helpers/testRender';
import { fireEvent, screen } from '@testing-library/dom';
import { act } from '@testing-library/react';

describe('Create/Edit Club Form', () => {
  const ResizeObserverMock = vi.fn(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn()
  }));

  // Stub the global ResizeObserver
  vi.stubGlobal('ResizeObserver', ResizeObserverMock);

  beforeEach(() => {
    testRender(<ClubForm />);
  });

  it('Render Correctly', () => {
    screen.getByLabelText('Nombre');
    screen.getByLabelText('Escudo');
    screen.getByLabelText('Pago de inscripción');
  });

  it('validate inputs', async () => {
    const nameInput = screen.getByLabelText('Nombre');
    const button = screen.getByText('Guardar');
    const longText =
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Id velit vel temporibus in! Cumque ea laboriosam.';

    act(() => {
      fireEvent.click(button);
    });

    await screen.findByText('Mínimo de 3 caracteres');

    fireEvent.change(nameInput, { target: { value: longText } });

    act(() => {
      fireEvent.click(button);
    });

    await screen.findByText('Máximo de 100 caracteres');
  });

  it('Accepts correct values', async () => {
    const nameInput = screen.getByLabelText('Nombre');
    const button = screen.getByText('Guardar');

    fireEvent.change(nameInput, { target: { value: 'Interpod' } });

    fireEvent.click(button);

    expect(screen.queryByText('Mínimo de 3 caracteres')).toBeNull();
  });
});
