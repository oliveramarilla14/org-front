import Layout from '@/Layouts/Layout';
import useSWR from 'swr';
import { apiUri } from '@/config/config';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { configType } from '@/types/config';
import ConfigForm from '@/components/views/config/ConfigForm';

export default function ConfigView() {
  const { data: config, isLoading } = useSWR<configType>(`${apiUri}/config`);

  return (
    <Layout title='Configuración' isLoading={isLoading}>
      <Card className='w-full max-w-4xl mt-5'>
        <CardHeader>
          <CardDescription>Ajusta los parámetros del partido según tus preferencias.</CardDescription>
        </CardHeader>
        <CardContent>
          <ConfigForm config={config} />
        </CardContent>
      </Card>
    </Layout>
  );
}
