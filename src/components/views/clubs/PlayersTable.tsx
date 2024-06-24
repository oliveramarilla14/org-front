import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PlayerStatsPayments } from '@/types/players';

interface Props {
  players: PlayerStatsPayments[];
}

export default function PlayersTable({ players }: Props) {
  return (
    <Table className='w-90'>
      <TableHeader>
        <TableRow>
          <TableHead>Jugador</TableHead>
          <TableHead>PJ</TableHead>
          <TableHead>GF</TableHead>
          <TableHead>PG</TableHead>
          <TableHead>PE</TableHead>
          <TableHead>PP</TableHead>
          <TableHead>GC</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {players.length === 0 && (
          <TableRow>
            <TableCell className='text-center text-xl' colSpan={11}>
              El equipo no tiene jugadores registrados
            </TableCell>
          </TableRow>
        )}
        {players.map((player) => (
          <TableRow key={player.id}>
            <TableCell>{player.name}</TableCell>
            <TableCell>{player.Stats?.played}</TableCell>
            <TableCell>{player.Stats?.goals}</TableCell>
            <TableCell>{player.Stats?.win}</TableCell>
            <TableCell>{player.Stats?.draw}</TableCell>
            <TableCell>{player.Stats?.loose}</TableCell>
            <TableCell>{player.Stats?.conceed}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
