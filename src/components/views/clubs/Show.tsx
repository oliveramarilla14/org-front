import { TeamShow } from '@/types/clubs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import ShowStats from './showStats';
import PlayersTable from './PlayersTable';
import { HeadTitle } from '@/components/fonts/headers';

interface Props {
  club: TeamShow;
}

export default function ShowClubData({ club }: Props) {
  return (
    <div className='flex flex-col items-center gap-5'>
      <HeadTitle>{club.name}</HeadTitle>
      <Avatar className='h-48 w-48'>
        <AvatarImage src={club?.badge || ''} />
        <AvatarFallback>{club?.name.slice(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>
      <ShowStats club={club} />
      <PlayersTable players={club.players} />
    </div>
  );
}
