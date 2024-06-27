import { deletePlayerFetcher as fetcher } from '@/api/delete';
import ActionModal from '@/components/modals/ActionModal';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { apiUri } from '@/config/config';
import { PlayerStatsPayments } from '@/types/players';
import { Trash } from 'lucide-react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSWRConfig } from 'swr';
import useSWRMutation from 'swr/mutation';

interface Props {
  players: PlayerStatsPayments[];
}

export default function PlayersDataTable({ players }: Props) {
  const { id } = useParams();
  const { mutate } = useSWRConfig();
  const { trigger } = useSWRMutation(`${apiUri}/players`, fetcher);
  const [deleteId, setDeleteId] = useState(0);
  const [deleteModal, setDeleteModal] = useState(false);

  const handleDelete = (id: number) => {
    setDeleteId(id);
    setDeleteModal(true);
  };

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
          <TableHead></TableHead>
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
            <TableCell>
              <Button variant='destructive' size='icon' title='Eliminar' onClick={() => handleDelete(player.id)}>
                <Trash size={20} />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <ActionModal
        onOpenChange={setDeleteModal}
        open={deleteModal}
        variant='destructive'
        title='Borrar Jugador'
        description='Esta acción no se puede deshacer.'
        onConfirm={async () => {
          await trigger(deleteId);
          setDeleteModal(false);
          mutate(`${apiUri}/clubs/${id}`);
        }}
      />
    </Table>
  );
}
