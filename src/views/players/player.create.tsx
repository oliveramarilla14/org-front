import Layout from '@/Layouts/Layout';
import createFetcher from '@/api/create';
import { Button } from '@/components/ui/button';
import PlayersForm from '@/components/views/players/PlayersForm';
import PlayersCreateTable from '@/components/views/players/PlayersTable';
import { apiUri } from '@/config/config';
import { Player, PlayerWithoutId } from '@/types/players';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useSWRMutation from 'swr/mutation';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';

export default function PlayerCreate() {
  const [players, setPlayers] = useState<PlayerWithoutId[]>([]);
  const { trigger, error, isMutating } = useSWRMutation(
    `${apiUri}/players/create`,
    createFetcher<PlayerWithoutId[], Player[]>
  );
  const navigate = useNavigate();

  const handleSave = async () => {
    await trigger(players);
    navigate(-1);
  };
  const handleDelete = (documentNumber: number) => {
    const deletedArray = players.filter((player) => player.documentNumber !== documentNumber);
    setPlayers(deletedArray);
  };
  return (
    <AlertDialog>
      <Layout title='Agregar Jugadores'>
        <div className='flex justify-end mb-2'>
          <div className='flex flex-col items-end'>
            <AlertDialogTrigger asChild>
              <Button className='md:block hidden'>{isMutating ? 'Guardando...' : 'Guardar'}</Button>
            </AlertDialogTrigger>

            {error && <p className='text-destructive mt-1'>{error.message}</p>}
          </div>
        </div>
        <div className='grid md:grid-cols-2 gap-5'>
          <PlayersForm setPlayers={setPlayers} />

          <PlayersCreateTable players={players} handleDelete={handleDelete} disabled={isMutating} />

          <AlertDialogTrigger asChild>
            <Button className='md:hidden block my-5'>{isMutating ? 'Guardando...' : 'Guardar'}</Button>
          </AlertDialogTrigger>
        </div>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Crear Jugadores</AlertDialogTitle>
            <AlertDialogDescription>Verifique que los datos son correctos.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button onClick={handleSave} disabled={isMutating}>
                {isMutating ? 'Guardando...' : 'Guardar'}
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </Layout>
    </AlertDialog>
  );
}
