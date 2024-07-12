import { apiUri } from '@/config/config';
import Layout from '@/Layouts/Layout';
import { FixtureMatch, PlayersOnMatch } from '@/types/matches';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import MatchHeader from '@/components/views/matches/MatchHeader';
import MatchPlayersTable from '@/components/views/matches/MatchPlayersTable';
import useSWRMutation from 'swr/mutation';
import { createPlayerMatchFetcher } from '@/api/create';

export default function MatchShow() {
  const { id } = useParams();
  const { data: match, isLoading } = useSWR<FixtureMatch>(`${apiUri}/matches/${id}`);
  const { trigger } = useSWRMutation(`${apiUri}/matches/playerstat`, createPlayerMatchFetcher);

  const handleSave = (data: PlayersOnMatch) => {
    /*
  al finalizar debe
    - crear un playerOnMatch por cada jugador de cada equipo
    
    - actualizar Match con datos del match
    - actualizar tabla de ClubStats
    - actualizar tabla de PlayerStats

    }


    *- crear amonestation en caso de amonestación
    *- crear multa en caso de amonestación
  */

    const data2 = {
      match: {
        id: 1,
        firstTeamGoals: 1,
        secondTeamGoals: 2,
        result: 2
      },
      playersOnMatch: {
        team1: [
          {
            playerId: 1,
            matchId: 1,
            goals: 0,
            yellow: 0,
            red: 0,
            conceed: 2
          }
        ],
        team2: [
          {
            playerId: 1,
            matchId: 1,
            goals: 0,
            yellow: 0,
            red: 0,
            conceed: 1
          }
        ]
      }
    };
    console.log(data2);
    trigger(data);
  };

  return (
    <Layout isLoading={isLoading} title='Partido'>
      {match && (
        <>
          <MatchHeader match={match} handleSave={handleSave} />
          <div className='flex gap-3 mt-4'>
            <MatchPlayersTable players={match.FirstTeam.players} />
            <MatchPlayersTable players={match.SecondTeam.players} />
          </div>
        </>
      )}
    </Layout>
  );
}
