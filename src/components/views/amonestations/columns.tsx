import { ColumnDef } from '@tanstack/react-table';
import { sortableHeader } from '@/helpers/tableHelpers';
import { Amonestation } from '@/types/amonestations';
import { Link } from 'react-router-dom';
import TableAmonestationDropdown from './TableAmonestationDropdown';

export const amonestationsColumns: ColumnDef<Amonestation>[] = [
  {
    header: sortableHeader<Amonestation>('#'),
    accessorKey: 'id',
    accessorFn: (row) => {
      return row.id.toString();
    },
    meta: {
      filterVariant: 'number'
    }
  },
  {
    header: sortableHeader<Amonestation>('Nombre'),
    accessorKey: 'Player.name',
    accessorFn: (row) => row.Player?.name || 'Todo el equipo'
  },
  {
    header: sortableHeader<Amonestation>('Equipo'),
    accessorKey: 'Club.name',
    accessorFn: (row) => row.Club.name
  },
  {
    header: sortableHeader<Amonestation>('Tipo'),
    accessorKey: 'type',
    meta: {
      filterVariant: 'select'
    }
  },
  {
    header: sortableHeader<Amonestation>('Sanción'),
    id: 'payment',
    accessorFn: (row) => {
      if (row.pointsDeducted) return 'Puntos';
      else return 'Partidos';
    },
    meta: {
      filterVariant: 'select'
    }
  },
  {
    header: sortableHeader<Amonestation>('Valor'),
    id: 'value',
    accessorFn: (row) => {
      if (row.pointsDeducted) return row.pointsDeducted + ' Puntos';
      else return row.matchesToPay + ' Partidos';
    }
  },
  {
    header: sortableHeader<Amonestation>('Cumplió'),
    id: 'accomplishment',
    accessorFn: (row) => {
      if (row.pointsDeducted) return row.matchesPaid === 1 ? ' Descontado' : 'Pendiente';
      else return `${row.matchesPaid}/${row.matchesToPay}`;
    }
  },

  {
    header: sortableHeader<Amonestation>('Pago'),
    id: 'payed',
    accessorFn: (row) => {
      if (row.paymentId) return 'Si';
      else return 'No';
    },
    cell: ({ row }) => {
      if (row.original.paymentId) return <Link to={`/pagos/${row.original.paymentId}`}>Si</Link>;
      else return 'No';
    },
    meta: {
      filterVariant: 'select'
    }
  },
  {
    header: 'Obs',
    accessorKey: 'observation',
    enableColumnFilter: false
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const amonestation = row.original;

      return <TableAmonestationDropdown amonestation={amonestation} />;
    },
    enableColumnFilter: false
  }
];
