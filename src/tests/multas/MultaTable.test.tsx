import { testRender } from '@/helpers/testRender';
import { screen } from '@testing-library/dom';
import { multaColumns } from '@/components/views/multas/columns';
import { multas } from '../mocks/uriHandlers/multasHandlers';
import PaymentsTable from '@/components/table/PaymentsTable';

describe('Stats Table', () => {
  beforeEach(() => {
    testRender(<PaymentsTable columns={multaColumns} data={multas} empty='No existen registros de multas.' />);
  });

  it('render correctly all headers', async () => {
    expect(await screen.findByText('Nombre')).toBeInTheDocument();
    expect(await screen.findByText('Equipo')).toBeInTheDocument();
    expect(await screen.findByText('Tipo')).toBeInTheDocument();
    expect(await screen.findByText('Estado')).toBeInTheDocument();
    expect(await screen.findByText('Vencimiento')).toBeInTheDocument();
    expect(await screen.findByText('Obs')).toBeInTheDocument();
  });

  it('handle undefined data', async () => {
    testRender(<PaymentsTable columns={multaColumns} data={[]} empty='No existen registros de multas.' />);
    await screen.findByText(/No existen registros de multas./i);
  });

  it('show the data in the table', async () => {
    await screen.findByText(multas[0].Player!.name);
    await screen.findByText(multas[0].Club!.name);
    await screen.findByText('Sin Equipo');
    await screen.findByText('Eliminado!');
  });
});
