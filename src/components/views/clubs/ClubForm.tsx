import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { apiUri } from '@/config/config';
import { useNavigate } from 'react-router-dom';
import { clubFormSchema } from '@/types/clubs';
import useSWRMutation from 'swr/mutation';
import { createClubFetcher as fetcher } from '@/api/create';
import { useToast } from '@/components/ui/use-toast';
import { Toaster } from '@/components/ui/toaster';

type FormType = z.infer<typeof clubFormSchema>;

export default function ClubForm() {
  const form = useForm<FormType>({
    resolver: zodResolver(clubFormSchema),
    defaultValues: {
      name: '',
      payment: false
    }
  });
  const { toast } = useToast();

  const { trigger, isMutating } = useSWRMutation(`${apiUri}/clubs`, fetcher, {
    onError: (error) => {
      toast({
        title: error.message,
        variant: 'destructive'
      });
    }
  });

  const navigate = useNavigate();
  const fileRef = form.register('badge');

  async function onSubmit(values: FormType) {
    const saveData = new FormData();
    saveData.append('name', values.name);
    saveData.append('badge', values.badge ? values.badge[0] : '');
    saveData.append('payment', values.payment ? 'true' : 'false');

    await trigger(saveData);
    navigate(-1);
  }
  const handleCancel = () => navigate(-1);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 w-fit mt-10'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input placeholder='FC Barcelona' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='badge'
          render={() => (
            <FormItem>
              <FormLabel>Escudo</FormLabel>
              <FormControl>
                <Input type='file' {...fileRef} />
              </FormControl>
              <FormDescription>(Opcional)</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='payment'
          render={({ field }) => (
            <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <div className='space-y-1 leading-none'>
                <FormLabel>Pago de inscripción</FormLabel>
                <FormDescription>Puede registrarse el pago mas tarde.</FormDescription>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' className='me-2' disabled={isMutating}>
          {isMutating ? 'Guardando...' : 'Guardar'}
        </Button>
        {isMutating || (
          <Button type='button' variant='destructive' onClick={handleCancel}>
            Cancelar
          </Button>
        )}
      </form>
      <Toaster />
    </Form>
  );
}
