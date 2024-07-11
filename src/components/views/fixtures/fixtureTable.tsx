import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from '@/components/ui/table';
import { FixtureMatch } from '@/types/matches';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { storageUri } from '@/config/config';

interface Props {
  matches: FixtureMatch[];
  fecha: number;
}

export function FixtureTable({ matches, fecha }: Props) {
  return (
    <div className='border rounded-lg mt-5'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='text-center'>Equipo 1</TableHead>
            <TableHead className='text-center'>Hora</TableHead>
            <TableHead className='text-center'>Equipo 2</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {matches
            .filter((match) => match.fecha === fecha)
            .map((match) => (
              <TableRow>
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

                <TableCell className='text-center'>{match.hora}</TableCell>

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
