import '@testing-library/jest-dom';
import { server } from './mocks/server';

import { mutate } from 'swr';

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => {
  mutate(
    () => true, // which cache keys are updated
    undefined, // update cache data to `undefined`
    { revalidate: true } // do not revalidate
  );
  server.resetHandlers();
});
afterAll(() => server.close());
