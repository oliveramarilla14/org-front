import { ModeToggle } from '@/theme/toggle-theme';
import { render, screen } from '@testing-library/react';

describe('Theme', () => {
  beforeEach(() => {
    render(<ModeToggle />);
  });

  it('Render correctly', () => {
    expect(screen.getByTestId('theme-dropdown-button')).toBeDefined();
  });

  it('Does not show dropdown at start', () => {
    expect(screen.queryByTestId('theme-system')).toBeNull();
  });
});
