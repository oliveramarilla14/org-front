import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { SWRConfig } from 'swr';

export function testRender(component: JSX.Element) {
  return render(
    <SWRConfig value={{ provider: () => new Map() }}>
      <MemoryRouter>{component}</MemoryRouter>
    </SWRConfig>
  );
}
