import { CustomAxiosError } from '@/types/error';
import { Toast } from '../ui/use-toast';

type ToastFunction = ({ ...props }: Toast) => void;

export function errorToast(toast: ToastFunction, error: CustomAxiosError) {
  return toast({
    variant: 'destructive',
    title: `${error.statusCode} - ${error?.message}`,
    description: 'Favor contactar con soporte.',
    duration: 3000
  });
}
