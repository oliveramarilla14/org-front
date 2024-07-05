import Layout from '@/Layouts/Layout';
import { createMultasFetcher } from '@/api/create';
import MultaForm from '@/components/views/multas/MultaForm';
import { apiUri } from '@/config/config';
import { TeamShow } from '@/types/clubs';
import { CustomAxiosError } from '@/types/error';
import { useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

export default function MultasCreate() {
  const { data: clubs, isLoading } = useSWR<TeamShow[], CustomAxiosError>(`${apiUri}/clubs/players`);
  const { trigger, isMutating } = useSWRMutation(`${apiUri}/payments/multas`, createMultasFetcher);
  const nav = useNavigate();

  return (
    <Layout title='Crear Pago' isLoading={isLoading}>
      <div>
        <MultaForm clubs={clubs ?? []} isMutating={isMutating} onSave={() => nav(-1)} trigger={trigger} />
      </div>
    </Layout>
  );
}
