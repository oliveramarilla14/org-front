import Layout from '@/Layouts/Layout';
import ShowClubData from '@/components/views/clubs/Show';
import { apiUri } from '@/config/config';
import { TeamShow } from '@/types/clubs';
import { CustomAxiosError } from '@/types/error';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';

export default function ClubShow() {
  const { id } = useParams();
  const { data, isLoading } = useSWR<TeamShow, CustomAxiosError>(`${apiUri}/clubs/${id}`);

  return <Layout isLoading={isLoading}>{data && <ShowClubData club={data} />}</Layout>;
}
