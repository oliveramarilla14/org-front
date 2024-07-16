import Layout from '@/Layouts/Layout';
import { ScrollArea } from '@/components/ui/scroll-area';
import FixtureTableReduced from '@/components/views/fixtures/fixtureTableReduced';
import Bento from '@/components/views/homepage/Bento';
import PositionTable from '@/components/views/positions/PositionTable';
import { apiUri } from '@/config/config';
import { getLocalFecha } from '@/helpers/localStorage.helper';
import { TeamStats } from '@/types/clubs';
import { CustomAxiosError } from '@/types/error';
import { FixtureMatch } from '@/types/matches';
import {
  BarChartHorizontalBig,
  CircleDollarSign,
  DiamondMinus,
  LandPlot,
  Sheet,
  ShieldHalf,
  WalletCards
} from 'lucide-react';
import useSWR from 'swr';

export default function Index() {
  const fecha = getLocalFecha();
  const { data: teams = [], isLoading: teamsLoading } = useSWR<TeamStats[], CustomAxiosError>(
    `${apiUri}/clubs/positions`
  );
  const { data: matches = [], isLoading: matchesLoading } = useSWR<FixtureMatch[], CustomAxiosError>(
    fecha ? `${apiUri}/matches/fixture/${fecha}` : null
  );
  return (
    <Layout isLoading={teamsLoading && matchesLoading} title='Exa Campoverde'>
      <div className='grid md:grid-cols-12 gap-4 mt-4'>
        <Bento title='Fixture' className='md:col-span-7 overflow-x-auto' link='/fixture' icon={<LandPlot />}>
          <ScrollArea className='h-72 rounded-md border w-fit"'>
            <FixtureTableReduced matches={matches ?? []} />
          </ScrollArea>
        </Bento>
        <Bento title='Tabla' className='md:col-span-5 overflow-x-auto ' link='positions' icon={<Sheet />}>
          <ScrollArea className='h-72 rounded-md border"'>
            <PositionTable teams={teams} reduced />
          </ScrollArea>
        </Bento>
        <Bento title='Equipos' className='md:col-span-4' link='/clubs' icon={<ShieldHalf />} />
        <Bento title='Estadísticas' className='md:col-span-4' link='/stats' icon={<BarChartHorizontalBig />} />
        <Bento title='Cuotas' className='md:col-span-4' link='/cuotas' icon={<WalletCards />} />
        <Bento title='Pagos' className='md:col-span-3' link='/pagos' icon={<CircleDollarSign />} />
        <Bento title='Amonestaciones' className='md:col-span-3' link='/amonestations' icon={<DiamondMinus />} />
      </div>
    </Layout>
  );
}
