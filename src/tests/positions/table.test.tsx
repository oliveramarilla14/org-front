import { render, screen } from '@testing-library/react';
import Test from '@/components/test';

describe('table', () => {
  beforeAll(() => {
    render(<Test />);
  });
  it('testing vitest', async () => {
    expect(await screen.getByText('oliver 1'));
  });
});
