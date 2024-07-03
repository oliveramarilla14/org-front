import { Cuota } from '@/types/payments';
import { ColumnDef } from '@tanstack/react-table';
import { CircleDollarSign, MoreHorizontal, Trash } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

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
    header: 'Pagado',
    accessorKey: 'paid'
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

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Abrir menu</span>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => handlePayCuota(cuota.id)}>
              <CircleDollarSign className='me-1' /> Pagar
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Trash className='me-1' />
              Eliminar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
  }
];

const handlePayCuota = (id: Cuota['id']) => {
  console.log(id);
};
