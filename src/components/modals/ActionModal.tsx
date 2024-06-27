import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Dispatch, SetStateAction } from 'react';
import { Button } from '../ui/button';

type Props = {
  onConfirm?: () => void;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  open: boolean;
  title: string;
  description?: string;
  variant: 'destructive';
};
function ActionModal({ open, onOpenChange, onConfirm, variant, title, description }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <DialogFooter>
          <Button variant={variant} onClick={onConfirm}>
            {variant === 'destructive' && 'Eliminar'}
          </Button>
          <DialogClose asChild>
            <Button variant='ghost'>Cancelar</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ActionModal;
