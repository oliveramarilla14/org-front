import Layout from '@/Layouts/Layout';
import Header from '@/components/views/homepage/Header';
import PositionTable from '@/components/views/positions/PositionTable';

export default function Positions() {
  const teams = [
    {
      clubId: 1,
      position: 1,
      points: 29,
      played: 38,
      win: 14,
      draw: 10,
      loose: 10,
      goals: 100,
      conceed: 50,
      yellows: 10,
      reds: 1,
      Club: {
        name: 'Interpod',
        badge: 'https://upload.wikimedia.org/wikipedia/hif/8/82/Arsenal_FC.png'
      }
    },
    {
      clubId: 2,
      position: 2,
      points: 20,
      played: 36,
      win: 10,
      draw: 10,
      loose: 10,
      goals: 100,
      conceed: 50,
      yellows: 10,
      reds: 1,
      Club: {
        name: 'Inter de Miami',
        badge: null
      }
    }
  ];
  return (
    <Layout>
      <Header title='Tabla de posiciones' />

      <PositionTable teams={teams} />
    </Layout>
  );
}
