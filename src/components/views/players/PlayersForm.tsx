import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { apiUri } from '@/config/config';
import { Club } from '@/types/clubs';
import { PlayerWithoutId, playerFormSchema } from '@/types/players';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import useSWR from 'swr';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { z } from 'zod';

type Props = {
  setPlayers: Dispatch<SetStateAction<PlayerWithoutId[]>>;
};
export default function PlayersForm({ setPlayers }: Props) {
  const { data: teams, isLoading } = useSWR<Club[]>(`${apiUri}/clubs`);
  const [searchParams] = useSearchParams();
  const teamId = searchParams.get('team');
  const defaultValues = {
    name: '',
    teamId: teamId || '',
    documentNumber: '',
    promYear: '',
    phoneNumber: ''
  };

  const form = useForm({
    resolver: zodResolver(playerFormSchema),
    defaultValues,
    reValidateMode: 'onSubmit'
  });

  const onSubmit = (data: z.infer<typeof playerFormSchema>) => {
    const transformedData: PlayerWithoutId = {
      ...data,
      teamId: parseInt(data.teamId, 10),
      documentNumber: parseInt(data.documentNumber, 10),
      promYear: parseInt(data.promYear, 10),
      phoneNumber: data.phoneNumber ? parseInt(data.phoneNumber, 10) : null
    };
    setPlayers((prev) => [...prev, transformedData]);
    form.reset(defaultValues);
  };

  return (
    <Form {...form}>
      <form className='space-y-3 w-fit grid items-end gap-5 grid-cols-2 mt-10' onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input placeholder='John Doe' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='teamId'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Equipo</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Seleccione...' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {teams &&
                      teams.map((team) => (
                        <SelectItem key={team.id} value={team.id.toString()}>
                          {team.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='documentNumber'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Numero de cédula</FormLabel>
              <FormControl>
                <Input placeholder='1111111' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='promYear'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Promo</FormLabel>
              <FormControl>
                <Input placeholder='1995' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='phoneNumber'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Numero de teléfono</FormLabel>
              <FormControl>
                <Input placeholder='0981111111' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className='w-fit'>Agregar</Button>
      </form>
    </Form>
  );
}
