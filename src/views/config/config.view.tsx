import Layout from '@/Layouts/Layout';
import useSWR from 'swr';
import { apiUri } from '@/config/config';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { defaultValues } from '@/types/config';

export default function ConfigView() {
  useSWR(`${apiUri}/config`);
  const form = useForm({
    defaultValues
  });
  const onSubmit = () => {
    console.log('entra');
  };
  return (
    <Layout title='Configuración'>
      <Card className='w-full max-w-4xl mt-5'>
        <CardHeader>
          <CardDescription>Ajusta los parámetros del partido según tus preferencias.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className='space-y-8' onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name='matchStartTime'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hora de Inicio</FormLabel>
                    <FormControl>
                      <Input type='text' {...field} />
                    </FormControl>
                    <FormDescription>Hora de inicio.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type='submit'>Submit</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </Layout>
  );
}
