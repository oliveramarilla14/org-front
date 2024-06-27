import Layout from '@/Layouts/Layout';
import ClubForm from '@/components/views/clubs/ClubForm';
import { apiUri } from '@/config/config';
import useSWRMutation from 'swr/mutation';
import { createClubFetcher as fetcher } from '@/api/create';
import { useNavigate } from 'react-router-dom';

export default function ClubCreate() {
  const { trigger, isMutating } = useSWRMutation(`${apiUri}/clubs`, fetcher);
  const nav = useNavigate();
  return (
    <Layout title='Añadir Club'>
      <ClubForm trigger={trigger} isMutating={isMutating} onSave={() => nav(-1)} />
    </Layout>
  );
}
