import { TableCell } from '@/components/ui/table';
import StatsTable from '@/components/views/stats/StatsTable';
import { testRender } from '@/helpers/testRender';
import { screen, waitFor } from '@testing-library/dom';
import { playerStats } from '../mocks/uriHandlers/playersHandlers';

describe('Stats Table', () => {
  const headers = ['Top', 'Jugador', 'Amarillas', 'Club', 'PJ', 'Prom.'];

  beforeEach(() => {
    testRender(
      <StatsTable
        sortBy='goals'
        columns={headers}
        stats={playerStats}
        renderCells={(stat) => (
          <>
            <TableCell>{stat.Player.name}</TableCell>
            <TableCell>{stat.conceed}</TableCell>
            <TableCell>{stat.Player.Club?.name || 'Sin club'}</TableCell>
            <TableCell>{stat.played}</TableCell>
            <TableCell>{(stat.goals / stat.played).toFixed(2)}</TableCell>
          </>
        )}
      />
    );
  });
  it('render correctly', async () => {
    await waitFor(() => {
      headers.forEach((header) => {
        expect(screen.getByText(header, { selector: 'th' })).toBeInTheDocument();
      });
    });
  });

  it('orders data correctly gpt', async () => {
    await waitFor(() => {
      const rows = screen.getAllByRole('row');
      const orderedPlayerNames = ['Test 2', 'Test 1'];
      rows.slice(1).forEach((row, index) => {
        const cells = row.querySelectorAll('td');
        expect(cells[1].textContent).toBe(orderedPlayerNames[index]); // assuming the player's name is in the second cell
      });
    });
  });

  it('show sin club when club is null', () => {
    const noClubPlayer = screen.getByText('Test 1');

    const clubCell = noClubPlayer.parentElement?.querySelectorAll('td')[3]; // El cuarto td corresponde a la columna "Club"

    expect(clubCell?.textContent).toBe('Sin club');
  });
});
