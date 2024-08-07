import Layout from '@/Layouts/Layout';
import createFetcher from '@/api/create';
import AmonestationForm from '@/components/views/amonestations/AmonestationForm';
import { apiUri } from '@/config/config';
import { Amonestation, AmonestationForm as AmonestationFormType } from '@/types/amonestations';
import { TeamShow } from '@/types/clubs';
import { CustomAxiosError } from '@/types/error';
import { useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

export default function AmonestationCreate() {
  const { data: clubs, isLoading } = useSWR<TeamShow[], CustomAxiosError>(`${apiUri}/clubs/players`);
  const { trigger, isMutating } = useSWRMutation(
    `${apiUri}/amonestations`,
    createFetcher<Omit<AmonestationFormType, 'sanction'>, Amonestation>
  );
  const nav = useNavigate();

  return (
    <Layout title='Crear Amonestación' isLoading={isLoading}>
      <div>
        <AmonestationForm
          clubs={clubs ?? []}
          isMutating={isMutating}
          onSave={() => nav('/amonestations')}
          trigger={trigger}
        />
      </div>
    </Layout>
  );
}
