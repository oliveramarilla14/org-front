import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import ShowStats from './showStats';
import { HeadTitle } from '@/components/fonts/headers';
import { apiUri, storageUri } from '@/config/config';
import { Button } from '@/components/ui/button';
import { TeamShow } from '@/types/clubs';
import { Dispatch, SetStateAction, useState } from 'react';
import ActionModal from '@/components/modals/ActionModal';
import useSWRMutation from 'swr/mutation';
import deleteFetcher from '@/api/delete';
import { useNavigate } from 'react-router-dom';

type Props = {
  club: TeamShow;
  setOpenEdit: Dispatch<SetStateAction<boolean>>;
};

export default function ClubShowInfo({ club, setOpenEdit }: Props) {
  const { trigger } = useSWRMutation(`${apiUri}/clubs/${club.id}`, deleteFetcher);
  const [openDelete, setOpenDelete] = useState(false);
  const nav = useNavigate();

  const handleDelete = () => {
    trigger();
    nav('/clubs');
  };

  return (
    <>
      <HeadTitle>{club.name}</HeadTitle>
      <Avatar className='h-48 w-48'>
        <AvatarImage src={club?.badge ? `${storageUri}/files/badge/${club.badge}` : ''} />
        <AvatarFallback>{club.name.slice(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>
      <ShowStats club={club} />
      <div>
        <Button
          variant='outline'
          className='me-3'
          onClick={() => {
            setOpenEdit(true);
          }}
        >
          Edit
        </Button>
        <Button variant={'destructive'} onClick={() => setOpenDelete(true)}>
          Delete
        </Button>
      </div>

      <ActionModal
        open={openDelete}
        onOpenChange={setOpenDelete}
        onConfirm={handleDelete}
        variant='destructive'
        title='Eliminar Club'
        description='Esta acción no se puede deshacer.'
      />
    </>
  );
}
