import { testRender } from '@/helpers/testRender';
import PlayerCreate from '@/views/players/player.create';

describe('Player view', () => {
  beforeEach(() => {
    testRender(<PlayerCreate />);
  });
  it('renders correctly', () => {});
});
