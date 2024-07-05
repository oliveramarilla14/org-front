import { Multa } from '@/types/payments';
import { ColumnDef } from '@tanstack/react-table';
import { sortableHeader } from '@/helpers/tableHelpers';
import TableMultaDropdown from './TableMultaDropdown';

export const multaColumns: ColumnDef<Multa>[] = [
  {
    header: sortableHeader<Multa>('Nombre'),
    accessorKey: 'Player.name',
    accessorFn: (row) => row.Player?.name || 'Todo el Equipo'
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
    header: sortableHeader<Multa>('Precio'),
    accessorKey: 'price',
    accessorFn: (val) => `${Intl.NumberFormat().format(val.price)} Gs`,
    meta: {
      filterVariant: 'range'
    }
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
    accessorKey: 'observation',
    enableColumnFilter: false
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const multa = row.original;

      if (multa.paid) {
        return <TableMultaDropdown multa={multa} variant='cancel' />;
      } else {
        return <TableMultaDropdown multa={multa} variant='confirm' />;
      }
    },
    enableColumnFilter: false
  }
];
