import Layout from '@/Layouts/Layout';
import Loading from '@/Layouts/Loading';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';
import Header from '@/components/views/homepage/Header';
import PositionTable from '@/components/views/positions/PositionTable';
import { apiUri } from '@/config/config';
import { TeamStats } from '@/types/clubs';
import { CustomAxiosError } from '@/types/error';
import { useEffect } from 'react';
import useSWR from 'swr';

export default function Positions() {
  const { data = [], isLoading, error } = useSWR<TeamStats[], CustomAxiosError>(`${apiUri}/clubs/positions`);
  const { toast } = useToast();

  useEffect(() => {
    if (error) {
      toast({
        variant: 'destructive',
        title: error?.message,
        description: 'Favor contactar con soporte.',
        duration: 3000
      });
    }
  }, [toast, error]);
  return (
    <Layout>
      <Header title='Tabla de posiciones' />

      {isLoading ? <Loading /> : <PositionTable teams={data} />}
      <Toaster />
    </Layout>
  );
}
