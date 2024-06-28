import Layout from '@/Layouts/Layout';
import { TableCell } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import StatsTable from '@/components/views/stats/StatsTable';
import { apiUri } from '@/config/config';
import { CustomAxiosError } from '@/types/error';
import { PlayerStatsWithData } from '@/types/players';
import useSWR from 'swr';

export default function StatsView() {
  const { data, isLoading } = useSWR<PlayerStatsWithData[], CustomAxiosError>(`${apiUri}/players/stats`);
  return (
    <Layout title='Estadísticas' isLoading={isLoading}>
      {data && (
        <Tabs defaultValue='goals' className=' mt-10'>
          <TabsList>
            <TabsTrigger value='goals'>Goles</TabsTrigger>
            <TabsTrigger value='yellows'>Amarillas</TabsTrigger>
            <TabsTrigger value='cleanSheets'>Vallas invictas</TabsTrigger>
          </TabsList>

          <TabsContent value='goals'>
            <StatsTable
              sortBy='goals'
              stats={data}
              columns={['Top', 'Jugador', 'Goles', 'Club', 'PJ', 'Prom.']}
              renderCells={(stat) => (
                <>
                  <TableCell>{stat.Player.name}</TableCell>
                  <TableCell>{stat.goals}</TableCell>
                  <TableCell>{stat.Player.Club?.name || 'Sin club'}</TableCell>
                  <TableCell>{stat.played}</TableCell>
                  <TableCell>{(stat.goals / stat.played).toFixed(2)}</TableCell>
                </>
              )}
            />
          </TabsContent>

          <TabsContent value='yellows'>
            <StatsTable
              sortBy='yellows'
              columns={['Top', 'Jugador', 'Amarillas', 'Club', 'PJ', 'Prom.']}
              stats={data}
              renderCells={(stat) => (
                <>
                  <TableCell>{stat.Player.name}</TableCell>
                  <TableCell>{stat.yellows}</TableCell>
                  <TableCell>{stat.Player.Club?.name || 'Sin club'}</TableCell>
                  <TableCell>{stat.played}</TableCell>
                  <TableCell>{(stat.yellows / stat.played).toFixed(2)}</TableCell>
                </>
              )}
            />
          </TabsContent>
          <TabsContent value='cleanSheets'>
            <StatsTable
              sortBy='conceed'
              columns={['Top', 'Jugador', 'GC', 'Club', 'PJ', 'Prom.']}
              stats={data}
              renderCells={(stat) => (
                <>
                  <TableCell>{stat.Player.name}</TableCell>
                  <TableCell>{stat.conceed}</TableCell>
                  <TableCell>{stat.Player.Club?.name || 'Sin club'}</TableCell>
                  <TableCell>{stat.played}</TableCell>
                  <TableCell>{(stat.goals / stat.played).toFixed(2)}</TableCell>
                </>
              )}
            />
          </TabsContent>
        </Tabs>
      )}
    </Layout>
  );
}
