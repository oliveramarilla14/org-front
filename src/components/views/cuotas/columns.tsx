import { Cuota } from '@/types/payments';
import { ColumnDef } from '@tanstack/react-table';
import TableMenuDropdown from './TableMenuDropdown';
import { sortableHeader } from '@/helpers/tableHelpers';

export const cuotaColumns: ColumnDef<Cuota>[] = [
  {
    header: sortableHeader<Cuota>('Nombre'),
    accessorKey: 'Player.name',
    filterFn: 'arrIncludes'
  },
  {
    header: sortableHeader<Cuota>('Equipo'),
    accessorKey: 'Club.name'
  },
  {
    header: sortableHeader<Cuota>('Estado'),
    accessorKey: 'paid',
    cell: ({ row }) => {
      const cuota = row.original;
      if (!cuota.paid) {
        const today = new Date();
        const deadline = new Date(cuota.deadline);
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
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const cuota = row.original;

      if (cuota.paid) {
        return <TableMenuDropdown cuota={cuota} variant='cancel' />;
      } else {
        return <TableMenuDropdown cuota={cuota} variant='confirm' />;
      }
    }
  }
];
