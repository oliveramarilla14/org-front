import { apiUri } from '@/config/config';
import Layout from '@/Layouts/Layout';
import { FixtureMatch } from '@/types/matches';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import MatchHeader from '@/components/views/matches/MatchHeader';
import MatchPlayersTable from '@/components/views/matches/MatchPlayersTable';

export default function MatchShow() {
  const { id } = useParams();
  const { data: match, isLoading } = useSWR<FixtureMatch>(`${apiUri}/matches/${id}`);

  return (
    <Layout isLoading={isLoading} title='Partido'>
      {match && (
        <>
          <MatchHeader match={match} />
          <div className='flex gap-3 mt-4'>
            <MatchPlayersTable players={match.FirstTeam.players} />
            <MatchPlayersTable players={match.SecondTeam.players} />
          </div>
        </>
      )}
    </Layout>
  );
}
