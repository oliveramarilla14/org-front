import { testRender } from '@/helpers/testRender';
import { screen } from '@testing-library/dom';
import CuotaTable from '@/components/views/cuotas/CuotaTable';
import { cuotaColumns } from '@/components/views/cuotas/columns';
import { cuotas } from '../mocks/uriHandlers/cuotasHandlers';

describe('Stats Table', () => {
  beforeEach(() => {
    testRender(<CuotaTable columns={cuotaColumns} data={cuotas} />);
  });

  it('render correctly all headers', async () => {
    expect(await screen.findByText('Nombre')).toBeInTheDocument();
    expect(await screen.findByText('Equipo')).toBeInTheDocument();
    expect(await screen.findByText('Estado')).toBeInTheDocument();
    expect(await screen.findByText('Vencimiento')).toBeInTheDocument();
  });

  it('handle undefined data', async () => {
    testRender(<CuotaTable columns={cuotaColumns} data={[]} />);
    await screen.findByText(/No existen registros de cuotas./i);
  });

  it('show the data in the table', async () => {
    await screen.findByText(cuotas[1].Club!.name);
    await screen.findByText(cuotas[1].Player!.name);
    await screen.findByText('Sin Equipo');
    await screen.findByText('Eliminado!');
  });

  // it('show sin club when club is null', () => {
  //   const noClubPlayer = screen.getByText('Test 1');

  //   const clubCell = noClubPlayer.parentElement?.querySelectorAll('td')[3]; // El cuarto td corresponde a la columna "Club"

  //   expect(clubCell?.textContent).toBe('Sin club');
  // });
});
