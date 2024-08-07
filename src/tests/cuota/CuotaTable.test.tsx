import { testRender } from '@/helpers/testRender';
import { screen } from '@testing-library/dom';
import { cuotaColumns } from '@/components/views/cuotas/columns';
import { cuotas } from '../mocks/uriHandlers/cuotasHandlers';
import PaymentsTable from '@/components/table/PaymentsTable';

describe('Stats Table', () => {
  beforeEach(() => {
    testRender(<PaymentsTable columns={cuotaColumns} data={cuotas} empty='No existen registros de cuotas.' />);
  });

  it('render correctly all headers', async () => {
    expect(await screen.findByText('Nombre')).toBeInTheDocument();
    expect(await screen.findByText('Equipo')).toBeInTheDocument();
    expect(await screen.findByText('Estado')).toBeInTheDocument();
    expect(await screen.findByText('Vencimiento')).toBeInTheDocument();
  });

  it('handle undefined data', async () => {
    testRender(<PaymentsTable columns={cuotaColumns} data={[]} empty='No existen registros de cuotas.' />);
    await screen.findByText(/No existen registros de cuotas./i);
  });

  it('show the data in the table', async () => {
    await screen.findByText(cuotas[1].Club!.name);
    await screen.findByText(cuotas[1].Player!.name);
    await screen.findByText('Sin Equipo');
    await screen.findByText('Eliminado!');
  });
});
