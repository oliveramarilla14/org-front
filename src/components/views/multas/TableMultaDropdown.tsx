import { CircleDollarSign, FilePenLine, MoreHorizontal, Trash } from 'lucide-react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';

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
import { Multa } from '@/types/payments';
import { DropdownMenuSeparator } from '@radix-ui/react-dropdown-menu';
import useSWRMutation from 'swr/mutation';

import { deleteByIdFetcher } from '@/api/delete';
import { mutate } from 'swr';
import { DialogTrigger } from '@radix-ui/react-dialog';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {
  multa: Multa;
  variant: 'confirm' | 'cancel';
};

export default function TableMultaDropdown({ multa, variant }: Props) {
  const { trigger: triggerCancel } = useSWRMutation(`${apiUri}/payments/multas`, handleCancelPayCuota);
  const { trigger: triggerPay } = useSWRMutation(`${apiUri}/payments/multas`, handlePayCuota);
  const { trigger: triggerDelete } = useSWRMutation(`${apiUri}/payments/multas`, deleteByIdFetcher);
  const [openModal, setOpenModal] = useState(false);
  const nav = useNavigate();
  return (
    <>
      <Dialog
        open={openModal}
        onOpenChange={() => {
          setTimeout(() => (document.body.style.pointerEvents = ''), 500);
          return setOpenModal((prev) => !prev);
        }}
      >
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
              <DropdownMenuItem onClick={() => triggerCancel(multa.id)} className='cursor-pointer'>
                <CircleDollarSign className='me-1' /> Cancelar pago
              </DropdownMenuItem>
            )}

            {variant === 'confirm' && (
              <>
                <DropdownMenuItem onClick={() => triggerPay(multa.id)} className='cursor-pointer'>
                  <CircleDollarSign className='me-1' /> Pagar
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => nav(`./${multa.id}/edit`)} className='cursor-pointer'>
                  <FilePenLine className='me-1' /> Editar
                </DropdownMenuItem>
                <DialogTrigger asChild>
                  <DropdownMenuItem className='cursor-pointer'>
                    <Trash className='me-1' />
                    Eliminar
                  </DropdownMenuItem>
                </DialogTrigger>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Eliminar Cuota?</DialogTitle>
            <DialogDescription>Esta acción no se puede deshacer.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant={'destructive'}
              onClick={() => {
                triggerDelete(multa.id);
                mutate(`${apiUri}/payments/multas`);
                setOpenModal(false);
                setTimeout(() => (document.body.style.pointerEvents = ''), 500);
              }}
            >
              Eliminar
            </Button>
            <DialogClose
              asChild
              onClick={() => {
                setTimeout(() => (document.body.style.pointerEvents = ''), 500);
              }}
            >
              <Button variant='ghost'>Cancelar</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
