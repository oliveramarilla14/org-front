import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { TriggerWithArgs } from 'swr/mutation';
import { CustomAxiosError } from '@/types/error';
import { ReactNode } from 'react';
import { Multa, MultaForm as MultaFormType, multaFormSchema } from '@/types/payments';
import { TeamShow } from '@/types/clubs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { format, formatDistance } from 'date-fns';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { es } from 'date-fns/locale';
import { Textarea } from '@/components/ui/textarea';

type Props = {
  multa?: Multa;
  trigger: TriggerWithArgs<Multa, CustomAxiosError, string, MultaFormType>;
  isMutating: boolean;
  children?: ReactNode;
  onSave: () => void;
  clubs: TeamShow[];
};

export default function MultaForm({ multa, isMutating, children, onSave, clubs, trigger }: Props) {
  const form = useForm<MultaFormType>({
    resolver: zodResolver(multaFormSchema),
    defaultValues: {
      clubId: multa?.Club?.id.toString() || '',
      playerId: multa?.Player?.id.toString() || '',
      type: multa?.type || '',
      price: multa?.price.toString() || '',
      deadline: multa?.deadline ? new Date(multa?.deadline) : undefined,
      observation: multa?.deadline || ''
    }
  });

  const navigate = useNavigate();
  const clubId = form.watch('clubId');

  async function onSubmit(values: MultaFormType) {
    await trigger(values);
    onSave();
  }
  const handleCancel = () => navigate(-1);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 w-fit mt-10'>
        <FormField
          control={form.control}
          name='clubId'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Club</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Elija Un equipo' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {clubs &&
                    clubs.map((club) => (
                      <SelectItem key={club.id} value={club.id.toString()}>
                        {club.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {clubId && (
          <FormField
            control={form.control}
            name='playerId'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Jugador</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value?.toString() || ''}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Asignado a' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <>
                      <SelectItem value='all'>Todo el equipo</SelectItem>

                      {clubs
                        .filter((club) => club.id.toString() === clubId)[0]
                        .players?.map((player) => (
                          <SelectItem key={player.id} value={player.id.toString()}>
                            {player.name}
                          </SelectItem>
                        ))}
                    </>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name='type'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Motivo</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value?.toString() || ''}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Seleccione' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value='multa'>Multa</SelectItem>
                    <SelectItem value='roja'>Roja</SelectItem>
                    <SelectItem value='amarilla'>Amarilla</SelectItem>
                    <SelectItem value='wo'>WO</SelectItem>
                    <SelectItem value='Personalizado'>Personalizado</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='price'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Precio</FormLabel>
              <FormControl>
                <Input placeholder='0' type='number' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='deadline'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <FormLabel>Vencimiento</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn('pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}
                    >
                      {field.value ? format(field.value, 'PPP', { locale: es }) : <span>Fecha de vencimiento</span>}
                      <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0' align='start'>
                  <Calendar
                    mode='single'
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                {field.value && (
                  <>
                    Vencimiento en: &nbsp;
                    {formatDistance(new Date(field.value), new Date(), { locale: es })}
                  </>
                )}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='observation'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Observación</FormLabel>
              <FormControl>
                <Textarea placeholder='Opcional...' className='resize-none' {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        {children || (
          <>
            <Button type='submit' className='me-2' disabled={isMutating}>
              {isMutating ? 'Guardando...' : 'Guardar'}
            </Button>
            {isMutating || (
              <Button type='button' variant='destructive' onClick={handleCancel}>
                Cancelar
              </Button>
            )}
          </>
        )}
      </form>
    </Form>
  );
}
