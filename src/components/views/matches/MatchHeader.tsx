import { storageUri } from '@/config/config';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { FixtureMatch } from '@/types/matches';

interface Props {
  match: FixtureMatch;
}

function MatchHeader({ match }: Props) {
  const goals = {
    firstTeam: 0,
    secondTeam: 0
  };

  return (
    <div className='mt-5 flex justify-around'>
      <div className='flex flex-col items-center justify-center gap-3'>
        <Avatar className='h-40 w-40 '>
          <AvatarImage
            src={match.FirstTeam?.badge ? `${storageUri}/files/badge/${match.FirstTeam?.badge}` : ''}
            className='object-cover'
          />
          <AvatarFallback>{match.FirstTeam.name.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <h1 className=' text-center text-3xl font-bold'>{match.FirstTeam.name}</h1>

        <p className='text-9xl font-bold '>{goals.firstTeam ?? '-'}</p>
      </div>

      <div className='flex flex-col gap-2 items-center'>
        <h2 className='text-3xl '>Fecha {match.fecha}</h2>
        <h3 className='text-2xl  text-muted-foreground'>{match.hora}</h3>
        <Button>Finalizar</Button>
      </div>

      <div className='flex flex-col items-center justify-center gap-3'>
        <Avatar className='h-40 w-40 '>
          <AvatarImage
            src={match.SecondTeam?.badge ? `${storageUri}/files/badge/${match.SecondTeam?.badge}` : ''}
            className='object-cover'
          />
          <AvatarFallback>{match.SecondTeam.name.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <h1 className=' text-center text-3xl font-bold'>{match.SecondTeam.name}</h1>
        <p className='text-9xl font-bold '>{goals.secondTeam ?? '-'}</p>
      </div>
    </div>
  );
}

export default MatchHeader;
