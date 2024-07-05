import Layout from '@/Layouts/Layout';
import PaymentsTable from '@/components/table/PaymentsTable';
import { cuotaColumns } from '@/components/views/cuotas/columns';
import { apiUri } from '@/config/config';
import { Cuota } from '@/types/payments';
import useSWR from 'swr';

export default function CuotasView() {
  const { data: cuotas, isLoading } = useSWR<Cuota[]>(`${apiUri}/payments/cuotas`);

  return (
    <Layout title='Cuotas' isLoading={isLoading}>
      <PaymentsTable data={cuotas ?? []} columns={cuotaColumns} empty='No existen registros de cuotas.' />
    </Layout>
  );
}
