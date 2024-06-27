import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { apiUri } from '@/config/config';
import { Club } from '@/types/clubs';
import { PlayerWithoutId } from '@/types/players';
import { Trash } from 'lucide-react';
import useSWR from 'swr';

type Props = {
  players: PlayerWithoutId[];
  handleDelete: (documentNumber: number) => void;
  disabled: boolean;
};

export default function PlayersCreateTable({ players, handleDelete, disabled }: Props) {
  const { data: teams } = useSWR<Club[]>(`${apiUri}/clubs`);

  return (
    <Table>
      <TableCaption>Los jugadores no se agregan hasta que se confirme el guardado!</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Nombre</TableHead>
          <TableHead>Equipo</TableHead>
          <TableHead>CI</TableHead>
          <TableHead>Promo</TableHead>
          <TableHead>Teléfono</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {players.map((player) => (
          <TableRow key={player.documentNumber}>
            <TableCell>{player.name}</TableCell>
            <TableCell>{teams?.find((team) => team.id === player.teamId)?.name}</TableCell>
            <TableCell>{player.documentNumber}</TableCell>
            <TableCell>{player.promYear}</TableCell>
            <TableCell>{player.phoneNumber}</TableCell>
            <TableCell>
              <Button
                variant={'destructive'}
                size='icon'
                onClick={() => handleDelete(player.documentNumber)}
                disabled={disabled}
              >
                <Trash size='20' />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
