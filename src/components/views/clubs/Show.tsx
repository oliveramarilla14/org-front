import { TeamShow } from '@/types/clubs';
import PlayersDataTable from './PlayersTable';
import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DialogClose, DialogDescription } from '@radix-ui/react-dialog';
import ClubForm from './ClubForm';
import ClubShowInfo from './ClubShowInfo';
import { Button } from '@/components/ui/button';
import useSWRMutation from 'swr/mutation';
import { apiUri } from '@/config/config';
import { editClubFetcher as fetcher } from '@/api/edit';

interface Props {
  club: TeamShow;
}

export default function ShowClubData({ club }: Props) {
  const { id } = useParams();
  const [openEdit, setOpenEdit] = useState(false);
  const { trigger, isMutating } = useSWRMutation(`${apiUri}/clubs/${id}`, fetcher);

  return (
    <>
      <div className='grid md:grid-cols-6 gap-5'>
        <div className='md:col-span-2 flex flex-col gap-10 items-center'>
          <ClubShowInfo club={club} setOpenEdit={setOpenEdit} />
        </div>
        <div className='md:col-span-4 md:place-self-center  overflow-x-auto'>
          <PlayersDataTable players={club.players} />
          <Link to={`/players/add?team=${id}`}>
            <Button className='mt-4'>Agregar Jugador</Button>
          </Link>
        </div>
      </div>

      <Dialog open={openEdit} onOpenChange={setOpenEdit}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar datos del club</DialogTitle>
          </DialogHeader>
          <DialogDescription></DialogDescription>
          <ClubForm club={club} trigger={trigger} isMutating={isMutating} onSave={() => setOpenEdit(false)}>
            <DialogFooter className='gap-3 '>
              <Button type='submit'>Confirmar</Button>
              <DialogClose asChild>
                <Button type='button' variant='secondary'>
                  Cancelar
                </Button>
              </DialogClose>
            </DialogFooter>
          </ClubForm>
        </DialogContent>
      </Dialog>
    </>
  );
}
