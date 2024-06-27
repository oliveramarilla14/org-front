import Layout from '@/Layouts/Layout';
import PositionTable from '@/components/views/positions/PositionTable';
import { apiUri } from '@/config/config';
import { TeamStats } from '@/types/clubs';
import { CustomAxiosError } from '@/types/error';
import useSWR from 'swr';

export default function Positions() {
  const { data, isLoading } = useSWR<TeamStats[], CustomAxiosError>(`${apiUri}/clubs/positions`);

  return (
    <Layout title='Tabla de posiciones' isLoading={isLoading}>
      {data && <PositionTable teams={data} />}
    </Layout>
  );
}
