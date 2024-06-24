import { TeamShow } from '@/types/clubs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import ShowStats from './showStats';
import PlayersTable from './PlayersTable';
import { HeadTitle } from '@/components/fonts/headers';
import { storageUri } from '@/config/config';
import { Button } from '@/components/ui/button';
import { Link, useParams } from 'react-router-dom';

interface Props {
  club: TeamShow;
}

export default function ShowClubData({ club }: Props) {
  const { id } = useParams();

  return (
    <div className='grid grid-cols-6 '>
      <div className='col-span-2 flex flex-col gap-10 items-center'>
        <HeadTitle>{club.name}</HeadTitle>
        <Avatar className='h-48 w-48'>
          <AvatarImage src={club?.badge ? `${storageUri}/files/badge/${club.badge}` : ''} />
          <AvatarFallback>{club.name.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <ShowStats club={club} />
        <div>
          <Button variant='outline' className='me-3'>
            Edit
          </Button>
          <Button variant={'destructive'}>Delete</Button>
        </div>
      </div>
      <div className='col-span-4 place-self-center'>
        <PlayersTable players={club.players} />
        <Link to={`/players/add?team=${id}`}>
          <Button className='mt-4'>Agregar Jugador</Button>
        </Link>
      </div>
    </div>
  );
}
