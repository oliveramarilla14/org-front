import { CircleDollarSign, CircleX, FilePenLine, MoreHorizontal, Trash } from 'lucide-react';
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
import { DropdownMenuSeparator } from '@radix-ui/react-dropdown-menu';
import useSWRMutation from 'swr/mutation';

import { deleteByIdFetcher } from '@/api/delete';
import { mutate } from 'swr';
import { DialogTrigger } from '@radix-ui/react-dialog';
import { useState } from 'react';
import { Amonestation } from '@/types/amonestations';
import { useNavigate } from 'react-router-dom';
import { handleCancelPayAmonestation, handlePayAmonestation } from '@/api/pay';

type Props = {
  amonestation: Amonestation;
  variant: 'paid' | 'cancel';
};

export default function TableAmonestationDropdown({ amonestation, variant }: Props) {
  const { trigger: triggerDelete } = useSWRMutation(`${apiUri}/amonestations`, deleteByIdFetcher);
  const { trigger: triggerCancel } = useSWRMutation(`${apiUri}/amonestations`, handleCancelPayAmonestation);
  const { trigger: triggerPay } = useSWRMutation(`${apiUri}/amonestations`, handlePayAmonestation);
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

            {variant === 'paid' && (
              <DropdownMenuItem onClick={() => triggerCancel(amonestation.id)} className='cursor-pointer'>
                <CircleX className='me-1' /> Cancelar amonestación
              </DropdownMenuItem>
            )}
            {variant === 'cancel' && amonestation.pointsDeducted && (
              <DropdownMenuItem onClick={() => triggerPay(amonestation.id)} className='cursor-pointer'>
                <CircleDollarSign className='me-1' /> Descontar puntos
              </DropdownMenuItem>
            )}

            {variant === 'cancel' && (
              <>
                <DropdownMenuItem onClick={() => nav(`./${amonestation.id}/edit`)} className='cursor-pointer'>
                  <FilePenLine className='me-1' /> Editar
                </DropdownMenuItem>
                <DropdownMenuSeparator />
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
            <DialogTitle>Eliminar amonestación?</DialogTitle>
            <DialogDescription>Esta acción no se puede deshacer.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant={'destructive'}
              onClick={() => {
                triggerDelete(amonestation.id);
                mutate(`${apiUri}/amonestations`);
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
