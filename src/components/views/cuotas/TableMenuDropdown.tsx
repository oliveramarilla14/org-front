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
import { handleCancelPayCuota, handlePayCuota } from '@/api/pay';
import { Cuota } from '@/types/payments';
import { DropdownMenuSeparator } from '@radix-ui/react-dropdown-menu';
import useSWRMutation from 'swr/mutation';

type Props = {
  cuota: Cuota;
  variant: 'confirm' | 'cancel';
};

export default function TableMenuDropdown({ cuota, variant }: Props) {
  const { trigger: triggerCancel } = useSWRMutation(`${apiUri}/payments/cuotas`, handleCancelPayCuota);
  const { trigger: triggerPay } = useSWRMutation(`${apiUri}/payments/cuotas`, handlePayCuota);

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
          <DropdownMenuItem onClick={() => triggerCancel(cuota.id)} className='cursor-pointer'>
            <CircleDollarSign className='me-1' /> Cancelar pago
          </DropdownMenuItem>
        )}

        {variant === 'confirm' && (
          <>
            <DropdownMenuItem onClick={() => triggerPay(cuota.id)} className='cursor-pointer'>
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
