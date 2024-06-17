import Layout from '@/Layouts/Layout';
import Loading from '@/Layouts/Loading';
import { fetcher } from '@/api/fetcher';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';
import ClubItem from '@/components/views/clubs/ClubItem';
import Header from '@/components/views/homepage/Header';
import { apiUri } from '@/config/config';
import { Club } from '@/types/clubs';
import { CustomAxiosError } from '@/types/error';
import { useEffect } from 'react';
import useSWR from 'swr';

export default function Clubs() {
  const { data = [], isLoading, error } = useSWR<Club[], CustomAxiosError>(`${apiUri}/clubs`, fetcher);
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
      <Header title='Equipos' />

      {isLoading ? (
        <Loading />
      ) : (
        <div className='grid md:grid-cols-5 gap-5 mt-5 group'>
          {data.map((club) => (
            <ClubItem key={club.id} club={club} size={5} />
          ))}
        </div>
      )}
      <Toaster />
    </Layout>
  );
}
