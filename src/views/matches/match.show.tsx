import { apiUri } from '@/config/config';
import Layout from '@/Layouts/Layout';
import { FixtureMatch } from '@/types/matches';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import MatchHeader from '@/components/views/matches/MatchHeader';
import MatchPlayersTable from '@/components/views/matches/MatchPlayersTable';
import { MatchDataProvider } from '@/providers/MatchStoreProvider';
import MatchPlayersUnavailable from '@/components/views/matches/MatchPlayersUnavailable';

export default function MatchShow() {
  const { id } = useParams();
  const { data: match, isLoading } = useSWR<FixtureMatch>(`${apiUri}/matches/${id}`);
  return (
    <Layout isLoading={isLoading} title='Partido'>
      <MatchDataProvider>
        {match && (
          <>
            <MatchHeader match={match} />
            <div className='flex flex-col md:flex-row gap-3 mt-4'>
              <span className='text-center mt-5 md:hidden'>{match.FirstTeam.name}</span>
              <MatchPlayersTable players={match.FirstTeam.players} team='1' />
              <span className='text-center mt-5 md:hidden'>{match.SecondTeam.name}</span>
              <MatchPlayersTable players={match.SecondTeam.players} team='2' />
            </div>
            {match.result ? (
              ''
            ) : (
              <>
                <h3 className='text-center font-bold  text-xl mt-10'>Jugadores no Disponibles</h3>
                <div className='flex flex-col md:flex-row gap-3 mt-10'>
                  <span className='text-center mt-5 md:hidden'>{match.FirstTeam.name}</span>
                  <MatchPlayersUnavailable match={match} team='1' />
                  <span className='text-center mt-5 md:hidden'>{match.SecondTeam.name}</span>
                  <MatchPlayersUnavailable match={match} team='2' />
                </div>
              </>
            )}
          </>
        )}
      </MatchDataProvider>
    </Layout>
  );
}

/*

- tabla para ver jugadores no disponibles por no estar habilitados ✅
- aviso al intentar poner al jugador ✅
- color rojo en tabla de players en caso de que se decida colocar al jugador igualmente ✅
- al querer finalizar, incluir texto que diga "existe un jugador no habilitado"
*/
