import ShowClubData from '@/components/views/clubs/Show';
import { testRender } from '@/helpers/testRender';
import { TeamShow } from '@/types/clubs';
import { screen } from '@testing-library/dom';

describe('Club show data', () => {
  beforeEach(() => {
    testRender(<ShowClubData club={data} />);
  });

  it('render correctly', () => {
    expect(screen.getByText('testing Club')).toBeInTheDocument();
  });

  it('show team info', () => {
    expect(screen.getByText('100')).toBeInTheDocument();
  });

  it('show players info', () => {
    expect(screen.getByText('jugador test')).toBeInTheDocument();
  });
});

const data: TeamShow = {
  id: 2,
  badge: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/20232.png',
  name: 'testing Club',
  inscriptionPayment: false,
  Stats: {
    clubId: 2,
    position: 2,
    points: 20,
    played: 36,
    win: 10,
    draw: 10,
    loose: 10,
    goals: 100,
    conceed: 50,
    yellows: 10,
    reds: 1
  },
  players: [
    {
      id: 3,
      name: 'jugador test',
      teamId: 2,
      documentNumber: 101139,
      promYear: 2019,
      phoneNumber: null,
      Stats: {
        playerId: 3,
        goalscorer: 1,
        played: 0,
        win: 15,
        draw: 3,
        loose: 2,
        goals: 0,
        conceed: 0,
        yellows: 0,
        reds: 0
      },
      payments: [
        {
          id: 3,
          clubId: 2,
          playerId: 3,
          type: 'cuota',
          price: 20000,
          deadline: '2024-06-10T16:50:45.000Z',
          paid: false,
          paydate: null
        }
      ]
    }
  ]
};
