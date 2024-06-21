import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { apiUri } from '@/config/config';
import { useNavigate } from 'react-router-dom';

const formSchema = z.object({
  name: z.string().min(3, 'Mínimo de 3 caracteres').max(100, 'Máximo de 100 caracteres'),
  badge: z.instanceof(FileList).optional(),
  payment: z.boolean()
});
type FormType = z.infer<typeof formSchema>;

export default function ClubForm() {
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      payment: false
    }
  });
  const navigate = useNavigate();
  const fileRef = form.register('badge');

  async function onSubmit(values: FormType) {
    const saveData = new FormData();
    saveData.append('name', values.name);
    saveData.append('badge', values.badge ? values.badge[0] : '');
    saveData.append('payment', values.payment ? 'true' : 'false');

    try {
      await axios.post(`${apiUri}/clubs`, saveData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      navigate(-1);
    } catch (error) {
      console.log(error);
    }
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

        <Button type='submit' className='me-2'>
          Guardar
        </Button>
        <Button type='button' variant='destructive' onClick={handleCancel}>
          Cancelar
        </Button>
      </form>
    </Form>
  );
}
