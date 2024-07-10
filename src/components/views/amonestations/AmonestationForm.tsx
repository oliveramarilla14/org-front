import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { TriggerWithArgs } from 'swr/mutation';
import { CustomAxiosError } from '@/types/error';
import { ReactNode } from 'react';
import { TeamShow } from '@/types/clubs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Amonestation, amonestationFormSchema, AmonestationForm as AmonestationFormType } from '@/types/amonestations';
import { Input } from '@/components/ui/input';

type Props = {
  amonestation?: Amonestation;
  trigger: TriggerWithArgs<Amonestation, CustomAxiosError, string, Omit<AmonestationFormType, 'sanction'>>;
  isMutating: boolean;
  children?: ReactNode;
  onSave: () => void;
  clubs: TeamShow[];
};

export default function AmonestationForm({ amonestation, isMutating, children, onSave, clubs, trigger }: Props) {
  const form = useForm<AmonestationFormType>({
    resolver: zodResolver(amonestationFormSchema),
    defaultValues: {
      clubId: amonestation?.clubId.toString() || '',
      playerId: amonestation?.clubId
        ? amonestation?.playerId?.toString() || 'all'
        : amonestation?.playerId?.toString() || '',
      pointsDeducted: amonestation?.pointsDeducted?.toString() || '',
      matchesToPay: amonestation?.matchesToPay?.toString() || '',
      type: amonestation?.type || '',
      sanction: amonestation?.matchesToPay ? 'partidos' : amonestation?.pointsDeducted ? 'puntos' : ''
    }
  });
  const navigate = useNavigate();
  const clubId = form.watch('clubId');
  const type = form.watch('sanction');

  async function onSubmit(values: AmonestationFormType) {
    if (type === 'partidos') {
      if (values.matchesToPay === '') {
        form.setError('matchesToPay', { type: 'custom', message: 'Ingrese un valor' });
        return;
      }
    }

    if (type === 'puntos') {
      if (values.pointsDeducted === '') {
        form.setError('pointsDeducted', { type: 'custom', message: 'Ingrese un valor' });
        return;
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { sanction, ...valuesWithoutSanction } = values;

    await trigger(valuesWithoutSanction);
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
          name='sanction'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sanción</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value?.toString() || ''}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Seleccione' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value='puntos'>Puntos</SelectItem>
                    <SelectItem value='partidos'>Partidos</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {type === 'puntos' ? (
          <FormField
            control={form.control}
            name='pointsDeducted'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Puntos a Deducir</FormLabel>
                <FormControl>
                  <Input placeholder='0' type='number' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ) : (
          type === 'partidos' && (
            <FormField
              control={form.control}
              name='matchesToPay'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cantidad de partidos</FormLabel>
                  <FormControl>
                    <Input placeholder='0' type='number' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )
        )}

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
