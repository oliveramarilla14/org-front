import { apiUri, storageUri } from '@/config/config';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { FixtureMatch } from '@/types/matches';
import { MatchDataContext } from '@/providers/MatchStoreProvider';
import { useContext, useEffect } from 'react';
import useSWRMutation from 'swr/mutation';
import { createPlayerMatchFetcher } from '@/api/create';

interface Props {
  match: FixtureMatch;
}

function MatchHeader({ match }: Props) {
  const { state, dispatch } = useContext(MatchDataContext);
  const { trigger } = useSWRMutation(`${apiUri}/matches/finish`, createPlayerMatchFetcher);

  const handleClick = async () => {
    await trigger(state);
  };

  useEffect(() => {
    dispatch({
      type: 'setMatch',
      payload: {
        match: match
      }
    });
    if (match.result) {
      match.team1 &&
        dispatch({
          type: 'setTeam',
          payload: {
            team: '1',
            teamStats: match.team1
          }
        });
      match.team2 &&
        dispatch({
          type: 'setTeam',
          payload: {
            team: '2',
            teamStats: match.team2
          }
        });
    }
  }, [match, dispatch]);

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

        <p className='text-9xl font-bold '>{match.result ? match.firstTeamGoals : state.match.firstTeamGoals ?? '-'}</p>
      </div>

      <div className='flex flex-col gap-2 items-center'>
        <h2 className='text-3xl '>Fecha {match.fecha}</h2>
        <h3 className='text-2xl text-muted-foreground'>{match.hora}</h3>
        {match.result ? '' : <Button onClick={handleClick}>Finalizar</Button>}
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
        <p className='text-9xl font-bold '>
          {match.result ? match.secondTeamGoals : state.match.secondTeamGoals ?? '-'}
        </p>
      </div>
    </div>
  );
}

export default MatchHeader;
