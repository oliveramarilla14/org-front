import { fetcher } from '@/api/fetcher';
import { render } from '@testing-library/react';
import { SWRConfig } from 'swr';
import { TestApp } from './testApp';

export function testRender(component: JSX.Element, route?: string) {
  return render(
    <SWRConfig value={{ provider: () => new Map(), fetcher }}>
      <TestApp route={route}>{component}</TestApp>
    </SWRConfig>
  );
}
