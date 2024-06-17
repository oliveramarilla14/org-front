import Layout from '@/Layouts/Layout';
import Loading from '@/Layouts/Loading';
import { fetcher } from '@/api/fetcher';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';
import ShowClubData from '@/components/views/clubs/Show';
import { apiUri } from '@/config/config';
import { TeamShow } from '@/types/clubs';
import { CustomAxiosError } from '@/types/error';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';

export default function ClubShow() {
  const { id } = useParams();

  const { data, isLoading, error } = useSWR<TeamShow, CustomAxiosError>(`${apiUri}/clubs/${id}`, fetcher);
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
      {isLoading ? <Loading /> : <ShowClubData club={data} />}
      <Toaster />
    </Layout>
  );
}
