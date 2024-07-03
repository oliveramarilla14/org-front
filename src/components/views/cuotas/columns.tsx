import { Cuota } from '@/types/payments';
import { ColumnDef } from '@tanstack/react-table';
import TableMenuDropdown from './TableMenuDropdown';

export const cuotaColumns: ColumnDef<Cuota>[] = [
  {
    header: 'Nombre',
    accessorKey: 'Player.name'
  },
  {
    header: 'Equipo',
    accessorKey: 'Club.name'
  },
  {
    header: 'Status',
    accessorKey: 'paid',
    cell: ({ row }) => {
      const cuota = row.original;
      if (!cuota.paid) {
        const today = new Date();
        const deadline = new Date(cuota.deadline);
        return today > deadline ? 'Vencido' : 'Pendiente';
      } else {
        return 'pagado';
      }
    }
  },

  {
    header: 'Vencimiento',
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
