import { apiUri } from '@/config/config';
import Layout from '@/Layouts/Layout';
import { FixtureMatch } from '@/types/matches';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import MatchHeader from '@/components/views/matches/MatchHeader';
import MatchPlayersTable from '@/components/views/matches/MatchPlayersTable';
import { MatchDataProvider } from '@/providers/MatchStoreProvider';

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
          </>
        )}
      </MatchDataProvider>
    </Layout>
  );
}
