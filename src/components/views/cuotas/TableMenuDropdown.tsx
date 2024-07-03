import { CircleDollarSign, MoreHorizontal, Trash } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { apiUri } from '@/config/config';
import { mutate } from 'swr';
import { handleCancelPayCuota, handlePayCuota } from '@/api/pay';
import { Cuota } from '@/types/payments';
import { DropdownMenuSeparator } from '@radix-ui/react-dropdown-menu';

type Props = {
  cuota: Cuota;
  variant: 'confirm' | 'cancel';
};

export default function TableMenuDropdown({ cuota, variant }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='h-8 w-8 p-0' title='Menu'>
          <span className='sr-only'>Abrir menu</span>
          <MoreHorizontal className='h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
        {variant === 'cancel' && (
          <DropdownMenuItem
            onClick={() => mutate(`${apiUri}/payments/cuotas`, handleCancelPayCuota(cuota.id))}
            className='cursor-pointer'
          >
            <CircleDollarSign className='me-1' /> Cancelar pago
          </DropdownMenuItem>
        )}

        {variant === 'confirm' && (
          <>
            <DropdownMenuItem
              onClick={() => mutate(`${apiUri}/payments/cuotas`, handlePayCuota(cuota.id))}
              className='cursor-pointer'
            >
              <CircleDollarSign className='me-1' /> Pagar
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className='cursor-pointer'>
              <Trash className='me-1' />
              Eliminar
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
