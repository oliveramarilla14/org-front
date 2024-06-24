import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ReactNode } from 'react';

type Props = {
  open: boolean;
  children: ReactNode;
};

export default function ConfirmCreate({ open, children }: Props) {
  return (
    <Dialog open={open}>
      <DialogContent className='flex flex-col items-center'>
        <DialogHeader>
          <DialogTitle>Creado exitosamente!</DialogTitle>
          <DialogDescription className='flex flex-col items-center gap-5'>{children}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
