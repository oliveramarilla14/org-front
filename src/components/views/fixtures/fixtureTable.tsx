import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from '@/components/ui/table';
import { FixtureMatch } from '@/types/matches';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { storageUri } from '@/config/config';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface Props {
  matches: FixtureMatch[];
  fecha: number;
}

export function FixtureTable({ matches, fecha }: Props) {
  const nav = useNavigate();
  return (
    <div className='border rounded-lg mt-5'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='text-center'>Equipo 1</TableHead>
            <TableHead></TableHead>
            <TableHead className='text-center'>Hora</TableHead>
            <TableHead></TableHead>
            <TableHead className='text-center'>Equipo 2</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {matches
            .filter((match) => match.fecha === fecha)
            .map((match) => (
              <TableRow key={match.id}>
                <TableCell>
                  <div className='flex  flex-col items-center'>
                    <Avatar className='h-10 w-10 '>
                      <AvatarImage
                        src={match.FirstTeam?.badge ? `${storageUri}/files/badge/${match.FirstTeam?.badge}` : ''}
                        className='object-cover'
                      />
                      <AvatarFallback>{match.FirstTeam.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <p className='max-w-14 text-center'>{match.FirstTeam.name}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <p className='text-2xl font-bold'>{match.firstTeamGoals ?? '-'}</p>
                </TableCell>

                <TableCell className='text-center'>
                  <p className='text-3xl font-bold'>{match.hora}</p>

                  <Button
                    className='mt-2'
                    size='sm'
                    variant={`${match.result ? 'outline' : 'default'}`}
                    onClick={() => nav(`/matches/${match.id}`)}
                  >
                    {match.result ? 'Ver' : 'Jugar'}
                  </Button>
                </TableCell>
                <TableCell>
                  <p className='text-2xl font-bold'>{match.secondTeamGoals ?? '-'}</p>
                </TableCell>
                <TableCell>
                  <div className='flex flex-col items-center'>
                    <Avatar className='h-10 w-10 '>
                      <AvatarImage
                        src={match.SecondTeam?.badge ? `${storageUri}/files/badge/${match.SecondTeam?.badge}` : ''}
                        className='object-cover'
                      />
                      <AvatarFallback>{match.SecondTeam.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <p className='max-w-14 text-center'>{match.SecondTeam.name}</p>
                  </div>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
