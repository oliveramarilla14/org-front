import { testRender } from '@/helpers/testRender';
import ClubCreate from '@/views/clubs/club.create';
import { screen } from '@testing-library/dom';

describe('Create Club', () => {
  const ResizeObserverMock = vi.fn(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn()
  }));

  // Stub the global ResizeObserver
  vi.stubGlobal('ResizeObserver', ResizeObserverMock);

  beforeEach(() => {
    testRender(<ClubCreate />);
  });
  it('renders Correctly', () => {
    expect(screen.getByText('Añadir Club')).toBeInTheDocument();
  });
});

/* 
- Render correctly
- show error on throw
- handle undefined or empty data 
*/
