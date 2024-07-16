import Layout from '@/Layouts/Layout';
import useSWR from 'swr';
import { apiUri } from '@/config/config';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { configFormSchema, defaultValues } from '@/types/config';
import { zodResolver } from '@hookform/resolvers/zod';
import { Switch } from '@/components/ui/switch';
import { z } from 'zod';

export default function ConfigView() {
  useSWR(`${apiUri}/config`);
  const form = useForm({
    defaultValues,
    resolver: zodResolver(configFormSchema)
  });
  const onSubmit = (val: unknown) => {
    //para evitar errores de tipo con typescript debido a las transformaciones con zod
    const data = val as z.infer<typeof configFormSchema>;
    console.log(data.inscriptionPrice);
  };

  return (
    <Layout title='Configuración'>
      <Card className='w-full max-w-4xl mt-5'>
        <CardHeader>
          <CardDescription>Ajusta los parámetros del partido según tus preferencias.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className='space-y-8 grid md:grid-cols-2 gap-4 items-center' onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name='matchStartTime'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hora de Inicio</FormLabel>
                    <FormControl>
                      <Input type='time' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='matchDuration'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duración de partido</FormLabel>
                    <FormControl>
                      <Input type='number' {...field} />
                    </FormControl>
                    <FormDescription>Cantidad de minutos.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='matchInterval'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tiempo entre partidos</FormLabel>
                    <FormControl>
                      <Input type='number' {...field} />
                    </FormControl>
                    <FormDescription>Cantidad de minutos.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='matchPrice'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Costo derecho partido</FormLabel>
                    <FormControl>
                      <Input type='number' {...field} />
                    </FormControl>
                    <FormDescription>Guaranies.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Card className='md:col-span-2'>
                <CardHeader>
                  <CardTitle>Tarjetas</CardTitle>
                </CardHeader>
                <CardContent className='grid md:grid-cols-2 gap-4'>
                  <FormField
                    control={form.control}
                    name='yellowCardPrice'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Precio Amarilla</FormLabel>
                        <FormControl>
                          <Input type='number' {...field} />
                        </FormControl>
                        <FormDescription>Guaranies.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='redCardPrice'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Precio Roja</FormLabel>
                        <FormControl>
                          <Input type='number' {...field} />
                        </FormControl>
                        <FormDescription>Guaranies.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='yellowAmountToMatch'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Acumulación de amarillas</FormLabel>
                        <FormControl>
                          <Input type='number' {...field} />
                        </FormControl>
                        <FormDescription>Cantidad de partidos para sumar amonestación.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='yellowCardMatches'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Partidos amarilla</FormLabel>
                        <FormControl>
                          <Input type='number' {...field} />
                        </FormControl>
                        <FormDescription>Partidos perdidos por amonestación.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='redCardMatches'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Partidos Roja</FormLabel>
                        <FormControl>
                          <Input type='number' {...field} />
                        </FormControl>
                        <FormDescription>Partidos perdidos por amonestación.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Card className='md:col-span-2'>
                <CardHeader>
                  <CardTitle>W.O</CardTitle>
                </CardHeader>
                <CardContent className='grid md:grid-cols-2 gap-4'>
                  <FormField
                    control={form.control}
                    name='woAmonestation'
                    render={({ field }) => (
                      <FormItem className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
                        <div className='space-y-0.5'>
                          <FormLabel>Amonestación por W.O</FormLabel>
                          <FormDescription></FormDescription>
                        </div>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {form.watch('woAmonestation') && (
                    <FormField
                      control={form.control}
                      name='woPrice'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Precio</FormLabel>
                          <FormControl>
                            <Input type='number' {...field} />
                          </FormControl>
                          <FormDescription>Guaranies.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </CardContent>
              </Card>

              <Card className='md:col-span-2'>
                <CardHeader>
                  <CardTitle>Cuota e Inscripción</CardTitle>
                </CardHeader>
                <CardContent className='grid md:grid-cols-2 gap-4'>
                  <FormField
                    control={form.control}
                    name='inscriptionPrice'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Precio de inscripción</FormLabel>
                        <FormControl>
                          <Input type='number' {...field} />
                        </FormControl>
                        <FormDescription>Guaranies.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='monthSocialPrice'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Precio Cuota</FormLabel>
                        <FormControl>
                          <Input type='number' {...field} />
                        </FormControl>
                        <FormDescription>Guaranies.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='monthSocialPayDay'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Vencimiento</FormLabel>
                        <FormControl>
                          <Input type='number' {...field} />
                        </FormControl>
                        <FormDescription>Dia del mes a vencer el pago de la cuota.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
              <Button type='submit'>Guardar</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </Layout>
  );
}
