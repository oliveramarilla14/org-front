import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { configFormSchema, configType } from '@/types/config';
import { zodResolver } from '@hookform/resolvers/zod';
import { Switch } from '@/components/ui/switch';
import { z } from 'zod';
import useSWRMutation from 'swr/mutation';
import { apiUri } from '@/config/config';
import { generateConfigFetcher } from '@/api/create';
import { useToast } from '@/components/ui/use-toast';
import { CheckIcon } from 'lucide-react';

interface Props {
  config: configType | undefined;
}
export default function ConfigForm({ config }: Props) {
  const { toast } = useToast();

  const { trigger, isMutating } = useSWRMutation(`${apiUri}/config`, generateConfigFetcher);
  const defaultValues = {
    matchStartTime: config?.matchStartTime || '',
    matchDuration: config?.matchDuration?.toString() || '',
    matchInterval: config?.matchInterval || '',
    matchPrice: config?.matchPrice?.toString() || '',
    yellowCardPrice: config?.yellowCardPrice?.toString() || '',
    yellowCardMatches: config?.yellowCardMatches?.toString() || '',
    yellowAmountToMatch: config?.yellowAmountToMatch?.toString() || '',
    redCardMatches: config?.redCardMatches?.toString() || '',
    woAmonestation: config?.woAmonestation ?? false,
    woPrice: config?.woPrice?.toString() || '',
    inscriptionPrice: config?.inscriptionPrice?.toString() || '',
    monthSocialPrice: config?.monthSocialPrice?.toString() || '',
    monthSocialPayDay: config?.monthSocialPayDay?.toString() || '',
    redCardPrice: config?.redCardPrice?.toString() || ''
  };

  const form = useForm({
    defaultValues,
    resolver: zodResolver(configFormSchema)
  });
  const onSubmit = async (val: unknown) => {
    //para evitar errores de tipo con typescript debido a las transformaciones con zod
    const data = val as z.infer<typeof configFormSchema>;
    await trigger(data);
    toast({
      title: (
        <div className='flex items-center'>
          <CheckIcon className='mr-2' />
          <span className='first-letter:capitalize'>Configuración guardada</span>
        </div>
      ),
      description: 'Los cambios se aplicaran a nuevos registros'
    });
  };

  return (
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
        <Button type='submit' className='md:col-span-2' disabled={isMutating}>
          {isMutating ? 'Guardando...' : 'Guardar'}
        </Button>
      </form>
    </Form>
  );
}
