import Layout from '@/Layouts/Layout';
import CreateButtonLink from '@/components/buttons/CreateButtonLink';
import ClubItem from '@/components/views/clubs/ClubItem';
import { apiUri } from '@/config/config';
import { Club } from '@/types/clubs';
import { CustomAxiosError } from '@/types/error';
import useSWR from 'swr';

export default function Clubs() {
  const { isLoading, data } = useSWR<Club[], CustomAxiosError>(`${apiUri}/clubs`);

  return (
    <Layout isLoading={isLoading} title='Equipos' create>
      {data && (
        <div className='grid md:grid-cols-5 gap-5 mt-5 group'>
          {data.map((club) => (
            <ClubItem key={club.id} club={club} size={1} />
          ))}
        </div>
      )}
      {data?.length === 0 && (
        <div className='flex justify-center flex-col items-center gap-5'>
          <h2 className='text-2xl bold'>No existen equipos registrados</h2>
          <CreateButtonLink className='text-xl ' />
        </div>
      )}
    </Layout>
  );
}
