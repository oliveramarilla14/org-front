import { Multa } from '@/types/payments';
import { ColumnDef } from '@tanstack/react-table';
import { sortableHeader } from '@/helpers/tableHelpers';
import TableCuotaDropdown from '../cuotas/TableMenuDropdown';

export const multaColumns: ColumnDef<Multa>[] = [
  {
    header: sortableHeader<Multa>('Nombre'),
    accessorKey: 'Player.name',
    accessorFn: (row) => row.Player?.name || 'Eliminado!'
  },
  {
    header: sortableHeader<Multa>('Equipo'),
    accessorKey: 'Club.name',
    accessorFn: (row) => row.Club?.name || 'Sin Equipo'
  },
  {
    header: sortableHeader<Multa>('Tipo'),
    accessorKey: 'type'
  },

  {
    header: sortableHeader<Multa>('Estado'),
    id: 'paid',
    accessorFn: (row) => {
      if (!row.paid) {
        const today = new Date();
        const deadline = new Date(row.deadline);
        return today > deadline ? 'Vencido' : 'Pendiente';
      } else {
        return 'Pagado';
      }
    },

    meta: {
      filterVariant: 'select'
    }
  },

  {
    header: sortableHeader<Multa>('Vencimiento'),

    accessorKey: 'deadline',
    cell: ({ row }) => {
      const date = new Date(row.getValue('deadline'));
      const formatted = date.toLocaleDateString();

      return formatted;
    },

    meta: {
      filterVariant: 'range'
    },
    filterFn: 'deadline'
  },
  {
    header: 'Obs',
    accessorKey: 'observation'
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const cuota = row.original;

      if (cuota.paid) {
        return <TableCuotaDropdown cuota={cuota} variant='cancel' />;
      } else {
        return <TableCuotaDropdown cuota={cuota} variant='confirm' />;
      }
    },
    enableColumnFilter: false
  }
];
