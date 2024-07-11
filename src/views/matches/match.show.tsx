import { apiUri, storageUri } from '@/config/config';
import Layout from '@/Layouts/Layout';
import { FixtureMatch } from '@/types/matches';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

export default function MatchShow() {
  const { id } = useParams();
  const { data: match, isLoading } = useSWR<FixtureMatch>(`${apiUri}/matches/${id}`);
  return (
    <Layout isLoading={isLoading} title='Partido'>
      {match && (
        <div className='mt-5 flex justify-around'>
          <div className='flex flex-col items-center justify-center gap-3'>
            <Avatar className='h-40 w-40 '>
              <AvatarImage
                src={match.FirstTeam?.badge ? `${storageUri}/files/badge/${match.FirstTeam?.badge}` : ''}
                className='object-cover'
              />
              <AvatarFallback>{match.FirstTeam.name.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <h1 className=' text-center text-3xl font-bold'>{match.FirstTeam.name}</h1>

            <p className='text-9xl font-bold '>1</p>
          </div>

          <div className='flex flex-col gap-2 items-center'>
            <h2 className='text-3xl '>Fecha {match.fecha}</h2>
            <h3 className='text-2xl  text-muted-foreground'>{match.hora}</h3>
            <Button>Finalizar</Button>
          </div>

          <div className='flex flex-col items-center justify-center gap-3'>
            <Avatar className='h-40 w-40 '>
              <AvatarImage
                src={match.SecondTeam?.badge ? `${storageUri}/files/badge/${match.SecondTeam?.badge}` : ''}
                className='object-cover'
              />
              <AvatarFallback>{match.SecondTeam.name.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <h1 className=' text-center text-3xl font-bold'>{match.SecondTeam.name}</h1>
            <p className='text-9xl font-bold '>1</p>
          </div>
        </div>
      )}
    </Layout>
  );
}
