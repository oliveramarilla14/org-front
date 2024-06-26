import { screen } from '@testing-library/react';
import PositionTable from '@/components/views/positions/PositionTable';
import { Club, ClubStats } from '@/types/clubs';
import { testRender } from '@/helpers/testRender';

interface TeamStats extends ClubStats {
  Club: Pick<Club, 'name' | 'badge'>;
}

describe('table', () => {
  const teams: TeamStats[] = [
    {
      clubId: 1,
      position: 1,
      points: 29,
      played: 38,
      win: 14,
      draw: 10,
      loose: 10,
      goals: 100,
      conceed: 50,
      yellows: 10,
      reds: 1,
      Club: {
        name: 'Interpod',
        badge: null
      }
    }
  ];

  it('testing table component', () => {
    testRender(<PositionTable teams={teams} />);
    expect(screen.getByText(teams[0].Club.name)).toBeInTheDocument();
  });

  it('shows no teams when no team is in data', async () => {
    const empty: never[] = [];
    testRender(<PositionTable teams={empty} />);

    expect(await screen.findByText('No hay datos de los equipos')).toBeInTheDocument();
  });

  it('hide elements when reduced', () => {
    testRender(<PositionTable teams={teams} reduced />);

    expect(screen.getByText('PP')).toBeInTheDocument();
    expect(screen.queryByText('GF')).toBeNull();
  });
});
