import Layout from '@/Layouts/Layout';
import useSWR from 'swr';
import { apiUri } from '@/config/config';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { configType } from '@/types/config';
import ConfigForm from '@/components/views/config/ConfigForm';
import { Button } from '@/components/ui/button';
import useSWRMutation from 'swr/mutation';
import deleteFetcher from '@/api/delete';
import ActionModal from '@/components/modals/ActionModal';
import { useState } from 'react';
import { CheckIcon } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

export default function ConfigView() {
  const { data: config, isLoading } = useSWR<configType>(`${apiUri}/config`);
  const { trigger } = useSWRMutation(`${apiUri}/matches/fixture`, deleteFetcher);
  const [openDelete, setOpenDelete] = useState(false);
  const { toast } = useToast();

  const handleConfirm = async () => {
    await trigger();
    setOpenDelete(false);
    toast({
      title: (
        <div className='flex items-center'>
          <CheckIcon className='mr-2' />
          <span className='first-letter:capitalize'>Fixture eliminado</span>
        </div>
      ),
      description: 'Los cambios se aplicaran a nuevos registros'
    });
  };

  return (
    <>
      <Layout title='Configuración' isLoading={isLoading}>
        <Card className='w-full max-w-4xl mt-5'>
          <CardHeader>
            <CardDescription>Ajusta los parámetros del partido según tus preferencias.</CardDescription>
          </CardHeader>
          <CardContent>
            <ConfigForm config={config} />
          </CardContent>
        </Card>
        <Button className='mt-3' variant='destructive' onClick={() => setOpenDelete(true)}>
          Borrar Fixture
        </Button>
      </Layout>

      <ActionModal
        title='Quiere borrar el fixture?'
        onOpenChange={setOpenDelete}
        open={openDelete}
        variant='destructive'
        description='Se eliminaran todos los partidos y sus datos!'
        onConfirm={handleConfirm}
      />
    </>
  );
}
