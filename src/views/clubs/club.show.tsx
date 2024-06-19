import Layout from '@/Layouts/Layout';
import { errorToast } from '@/components/toast/errorToast';
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
  const { data, isLoading, error } = useSWR<TeamShow, CustomAxiosError>(`${apiUri}/clubs/${id}`);
  const { toast } = useToast();

  useEffect(() => {
    if (error) errorToast(toast, error);
  }, [toast, error]);
  return (
    <Layout isLoading={isLoading}>
      {!isLoading && data && <ShowClubData club={data} />}
      <Toaster />
    </Layout>
  );
}
