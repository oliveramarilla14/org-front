import Layout from '@/Layouts/Layout';
import CuotaTable from '@/components/views/cuotas/CuotaTable';
import { cuotaColumns } from '@/components/views/cuotas/columns';
// import { cuotaColumns } from '@/components/views/cuotas/columns';
import { apiUri } from '@/config/config';
import { Cuota } from '@/types/payments';
import useSWR from 'swr';

export default function CuotasView() {
  const { data: cuotas } = useSWR<Cuota[]>(`${apiUri}/payments/cuotas`);

  return (
    <Layout title='Cuotas'>
      <CuotaTable data={cuotas ?? []} columns={cuotaColumns} />
    </Layout>
  );
}
