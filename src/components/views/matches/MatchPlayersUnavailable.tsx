import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FixtureMatch } from '@/types/matches';
import { PlayersFixtureData } from '@/types/players';

interface Props {
  match: FixtureMatch;
  team: '1' | '2';
}

export default function MatchPlayersUnavailable({ match, team }: Props) {
  const data: PlayersFixtureData[] = [];

  if (team === '1') {
    match.FirstTeam.players.forEach((player) => {
      if (player.amonestations.length > 0) {
        data.push(player);
        return;
      }

      if (player.payments.length > 0) {
        data.push(player);
        return;
      }
    });
  }

  if (team === '2') {
    match.SecondTeam.players.forEach((player) => {
      if (player.amonestations.length > 0) {
        data.push(player);
        return;
      }

      if (player.payments.length > 0) {
        data.push(player);
        return;
      }
    });
  }
  return (
    <Table className='border'>
      <TableHeader>
        <TableRow>
          <TableHead>Nombre</TableHead>
          <TableHead>CI</TableHead>
          <TableHead>Tipo</TableHead>
          <TableHead>Nro</TableHead>
          <TableHead>Estado</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((player) => {
          return player.amonestations.map((amonestation) => (
            <TableRow key={amonestation.id}>
              <TableCell>{player.name}</TableCell>
              <TableCell>{player.documentNumber}</TableCell>
              <TableCell>Amonestación - {amonestation.type}</TableCell>
              <TableCell>{amonestation.id}</TableCell>
              <TableCell>Vencido</TableCell>
            </TableRow>
          ));
        })}
        {data.map((player) => {
          return player.payments.map((payment) => (
            <TableRow key={payment.id}>
              <TableCell>{player.name}</TableCell>
              <TableCell>{player.documentNumber}</TableCell>
              <TableCell>Pago - {payment.type}</TableCell>
              <TableCell>{payment.id}</TableCell>
              <TableCell>Vencido</TableCell>
            </TableRow>
          ));
        })}
      </TableBody>
    </Table>
  );
}
