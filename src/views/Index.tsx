import Layout from '@/Layouts/Layout';
import Bento from '@/components/views/homepage/Bento';
import PositionTable from '@/components/views/positions/PositionTable';
import { apiUri } from '@/config/config';
import { TeamStats } from '@/types/clubs';
import { CustomAxiosError } from '@/types/error';
import useSWR from 'swr';

export default function Index() {
  const { data: teams = [] } = useSWR<TeamStats[], CustomAxiosError>(`${apiUri}/clubs/positions`);

  return (
    <Layout isLoading={false} title='Exa Campoverde'>
      <div className='grid md:grid-cols-12 gap-4 mt-4'>
        <Bento title='Fixture' className='md:col-span-7' link='/fixture' />
        <Bento title='Tabla' className='md:col-span-5 ' link='positions'>
          <PositionTable teams={teams} reduced />
        </Bento>
        <Bento title='Equipos' className='md:col-span-4' link='/clubs' />
        <Bento title='Estadísticas' className='md:col-span-4' link='/stats' />
        <Bento title='Cuotas' className='md:col-span-4' link='/cuotas' />
        <Bento title='Pagos' className='md:col-span-3' link='/pagos' />
        <Bento title='Amonestaciones' className='md:col-span-3' link='/amonestations' />
      </div>
    </Layout>
  );
}
