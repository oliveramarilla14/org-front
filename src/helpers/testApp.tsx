import { errorToast } from '@/components/toast/errorToast';
import { useToast } from '@/components/ui/use-toast';
import { CustomAxiosError } from '@/types/error';
import { ReactNode } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { SWRConfig } from 'swr';

export function TestApp({ children }: { children: ReactNode }) {
  const { toast } = useToast();

  return (
    <SWRConfig
      value={{
        onError: (error: CustomAxiosError) => errorToast(toast, error)
      }}
    >
      <MemoryRouter>{children}</MemoryRouter>
    </SWRConfig>
  );
}
