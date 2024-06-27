import { fetcher } from '@/api/fetcher';
import { render } from '@testing-library/react';
import { SWRConfig } from 'swr';
import { TestApp } from './testApp';

export function testRender(component: JSX.Element) {
  return render(
    <SWRConfig value={{ provider: () => new Map(), fetcher }}>
      <TestApp>{component}</TestApp>
    </SWRConfig>
  );
}
