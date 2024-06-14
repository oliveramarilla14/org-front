import { render, screen } from '@testing-library/react';
import PositionTable from '@/components/views/positions/PositionTable';
import { Club, ClubStats } from '@/types/clubs';

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
    render(<PositionTable teams={teams} />);
    expect(screen.getByText(teams[0].Club.name)).toBeInTheDocument();
  });

  it('shows no teams when no team is in data', () => {
    const teams: never[] = [];
    render(<PositionTable teams={teams} />);
    expect(screen.getByText('No hay datos de los equipos')).toBeInTheDocument();
  });
});
