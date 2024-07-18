import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { storageUri } from '@/config/config';
import { Club, ClubStats } from '@/types/clubs';
import { useEffect, useState } from 'react';

interface TeamStats extends ClubStats {
  Club: Pick<Club, 'name' | 'badge'>;
}

type Props = {
  teams: TeamStats[];
  reduced?: boolean;
};

export default function PositionTable({ teams, reduced = false }: Props) {
  const [empty, setEmpty] = useState(false);

  useEffect(() => {
    if (teams.length == 0) {
      setEmpty(true);
    } else {
      setEmpty(false);
    }
  }, [teams]);

  return (
    <Table className='mt-4 '>
      <TableHeader>
        <TableRow className='text-lg'>
          <TableHead>Pos</TableHead>
          <TableHead className='text-center'>Club</TableHead>
          <TableHead>Puntos</TableHead>
          <TableHead>PJ</TableHead>
          <TableHead>PG</TableHead>
          <TableHead>PE</TableHead>
          <TableHead>PP</TableHead>
          {reduced || (
            <>
              <TableHead>GF</TableHead>
              <TableHead>GC</TableHead>
              <TableHead>Amarilla</TableHead>
              <TableHead>Rojas</TableHead>
            </>
          )}
        </TableRow>
      </TableHeader>
      <TableBody className='text-left'>
        {empty && (
          <TableRow>
            <TableCell className='text-center text-2xl' colSpan={11}>
              No hay datos de los equipos
            </TableCell>
          </TableRow>
        )}

        {teams
          .sort((a, b) => {
            if (a.position && b.position) {
              return a.position - b.position;
            }
            return 0;
          })
          .map((team) => (
            <TableRow className='text-lg' key={team.clubId}>
              <TableCell>{team.position}</TableCell>
              <TableCell className='flex flex-col items-center gap-1 font-bold text-lg'>
                {reduced ||
                  (!!team.Club.badge && <img className='w-10' src={`${storageUri}/files/badge/${team.Club.badge}`} />)}
                {team.Club.name}
              </TableCell>
              <TableCell>{team.points}</TableCell>
              <TableCell>{team.played}</TableCell>
              <TableCell>{team.win}</TableCell>
              <TableCell>{team.draw}</TableCell>
              <TableCell>{team.loose}</TableCell>
              {reduced || (
                <>
                  <TableCell>{team.goals}</TableCell>
                  <TableCell>{team.conceed}</TableCell>
                  <TableCell>{team.yellows}</TableCell>
                  <TableCell>{team.reds}</TableCell>
                </>
              )}
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}
