import AmonestationTable from '@/components/table/AmonestationTable';
import { amonestationsColumns } from '@/components/views/amonestations/columns';
import { apiUri } from '@/config/config';
import Layout from '@/Layouts/Layout';
import { Amonestation } from '@/types/amonestations';
import useSWR from 'swr';

export default function AmonestationsView() {
  const { data: amonestations, isLoading } = useSWR<Amonestation[]>(`${apiUri}/amonestations`);
  return (
    <Layout title='Amonestaciones' create isLoading={isLoading}>
      <AmonestationTable
        columns={amonestationsColumns}
        data={amonestations ?? []}
        empty='No existen registros de amonestaciones'
      />
    </Layout>
  );
}
