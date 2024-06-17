import { TeamShow } from '@/types/clubs';
import Header from '../homepage/Header';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import ShowStats from './showStats';
import PlayersTable from './PlayersTable';

interface Props {
  club: TeamShow | undefined;
}

export default function ShowClubData({ club }: Props) {
  if (!club) return;

  return (
    <div className='flex flex-col items-center gap-5'>
      <Header title={club?.name || ''} />
      <Avatar className='h-48 w-48'>
        <AvatarImage src={club?.badge || ''} />
        <AvatarFallback>{club?.name.slice(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>
      <ShowStats club={club} />
      <PlayersTable players={club.players} />
    </div>
  );
}
