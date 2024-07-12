import { apiUri } from '@/config/config';
import Layout from '@/Layouts/Layout';
import { FixtureMatch, PlayersOnMatch } from '@/types/matches';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import MatchHeader from '@/components/views/matches/MatchHeader';
import MatchPlayersTable from '@/components/views/matches/MatchPlayersTable';
import useSWRMutation from 'swr/mutation';
import { createPlayerMatchFetcher } from '@/api/create';
import { MatchDataProvider } from '@/providers/MatchStoreProvider';

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

    trigger(data);
  };

  return (
    <Layout isLoading={isLoading} title='Partido'>
      <MatchDataProvider>
        {match && (
          <>
            <MatchHeader match={match} handleSave={handleSave} />
            <div className='flex gap-3 mt-4'>
              <MatchPlayersTable players={match.FirstTeam.players} team='1' />
              <MatchPlayersTable players={match.SecondTeam.players} team='2' />
            </div>
          </>
        )}
      </MatchDataProvider>
    </Layout>
  );
}
