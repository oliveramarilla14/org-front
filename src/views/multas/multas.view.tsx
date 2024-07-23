import Layout from '@/Layouts/Layout';
import PaymentsTable from '@/components/table/PaymentsTable';
import { multaColumns } from '@/components/views/multas/columns';
import { apiUri } from '@/config/config';
import { Multa } from '@/types/payments';
import useSWR from 'swr';

export default function MultasView() {
  const { data: multas, isLoading } = useSWR<Multa[]>(`${apiUri}/payments/multas`);

  return (
    <Layout title='Pagos' isLoading={isLoading} create>
      <PaymentsTable data={multas ?? []} columns={multaColumns} empty='No existen registros de pagos.' />
    </Layout>
  );
}
