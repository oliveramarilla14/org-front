import Layout from '@/Layouts/Layout';
import { editAmonestationFetcher } from '@/api/edit';
import AmonestationForm from '@/components/views/amonestations/AmonestationForm';
import { apiUri } from '@/config/config';
import { Amonestation } from '@/types/amonestations';
import { TeamShow } from '@/types/clubs';
import { CustomAxiosError } from '@/types/error';
import { useNavigate, useParams } from 'react-router-dom';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

export default function AmonestationEdit() {
  const { id } = useParams();
  const { data: clubs, isLoading: loadingClub } = useSWR<TeamShow[], CustomAxiosError>(`${apiUri}/clubs/players`);
  const { data: amonestation, isLoading: loadingAmonestation } = useSWR<Amonestation, CustomAxiosError>(
    `${apiUri}/amonestations/${id}`
  );
  const { trigger, isMutating } = useSWRMutation(`${apiUri}/amonestations/${id}`, editAmonestationFetcher);
  const nav = useNavigate();

  return (
    <Layout title='Editar Amonestación' isLoading={loadingClub || loadingAmonestation}>
      <div>
        <AmonestationForm
          clubs={clubs ?? []}
          isMutating={isMutating}
          onSave={() => nav(-1)}
          trigger={trigger}
          amonestation={amonestation}
        />
      </div>
    </Layout>
  );
}
