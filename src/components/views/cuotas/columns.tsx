import { Cuota } from '@/types/payments';
import { ColumnDef } from '@tanstack/react-table';
import TableCuotaDropdown from './TableMenuDropdown';
import { sortableHeader } from '@/helpers/tableHelpers';

export const cuotaColumns: ColumnDef<Cuota>[] = [
  {
    header: sortableHeader<Cuota>('#'),
    accessorKey: 'id',
    accessorFn: (row) => {
      return row.id.toString();
    },
    meta: {
      filterVariant: 'number'
    }
  },
  {
    header: sortableHeader<Cuota>('Nombre'),
    accessorKey: 'Player.name',
    accessorFn: (row) => row.Player?.name || 'Eliminado!'
  },
  {
    header: sortableHeader<Cuota>('Equipo'),
    accessorKey: 'Club.name',
    accessorFn: (row) => row.Club?.name || 'Sin Equipo'
  },
  {
    header: sortableHeader<Cuota>('Estado'),
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
    header: sortableHeader<Cuota>('Vencimiento'),

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
