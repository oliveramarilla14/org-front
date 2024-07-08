import Layout from '@/Layouts/Layout';
import { editMultasFetcher } from '@/api/edit';
import MultaForm from '@/components/views/multas/MultaForm';
import { apiUri } from '@/config/config';
import { TeamShow } from '@/types/clubs';
import { CustomAxiosError } from '@/types/error';
import { Multa } from '@/types/payments';
import { useNavigate, useParams } from 'react-router-dom';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

export default function MultasEdit() {
  const { id } = useParams();
  const { data: clubs, isLoading: loadingClub } = useSWR<TeamShow[], CustomAxiosError>(`${apiUri}/clubs/players`);
  const { data: multa, isLoading: loadingMulta } = useSWR<Multa, CustomAxiosError>(`${apiUri}/payments/multas/${id}`);
  const { trigger, isMutating } = useSWRMutation(`${apiUri}/payments/multas/${id}`, editMultasFetcher);
  const nav = useNavigate();

  return (
    <Layout title='Crear Pago' isLoading={loadingClub || loadingMulta}>
      <div>
        <MultaForm clubs={clubs ?? []} isMutating={isMutating} onSave={() => nav(-1)} trigger={trigger} multa={multa} />
      </div>
    </Layout>
  );
}
