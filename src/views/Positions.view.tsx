import Layout from '@/Layouts/Layout';
import { errorToast } from '@/components/toast/errorToast';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';
import PositionTable from '@/components/views/positions/PositionTable';
import { apiUri } from '@/config/config';
import { TeamStats } from '@/types/clubs';
import { CustomAxiosError } from '@/types/error';
import { useEffect } from 'react';
import useSWR from 'swr';

export default function Positions() {
  const { data, isLoading, error } = useSWR<TeamStats[], CustomAxiosError>(`${apiUri}/clubs/positions`);
  const { toast } = useToast();

  useEffect(() => {
    if (error) errorToast(toast, error);
  }, [toast, error]);
  return (
    <Layout title='Tabla de posiciones' isLoading={isLoading}>
      {data && <PositionTable teams={data} />}
      <Toaster />
    </Layout>
  );
}
