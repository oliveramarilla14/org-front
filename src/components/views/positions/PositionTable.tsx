import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Club, ClubStats } from '@/types/clubs';
interface TeamStats extends ClubStats {
  Club: Pick<Club, 'name' | 'badge'>;
}

type Props = {
  teams: TeamStats[];
};

export default function PositionTable({ teams }: Props) {
  return (
    <Table className='mt-4'>
      <TableHeader>
        <TableRow className='text-lg'>
          <TableHead>Posición</TableHead>
          <TableHead className='text-center'>Club</TableHead>
          <TableHead>Puntos</TableHead>
          <TableHead>PJ</TableHead>
          <TableHead>PG</TableHead>
          <TableHead>PE</TableHead>
          <TableHead>PP</TableHead>
          <TableHead>GF</TableHead>
          <TableHead>GC</TableHead>
          <TableHead>Amarilla</TableHead>
          <TableHead>Rojas</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className='text-left'>
        {teams.map((team) => (
          <TableRow className='text-lg' key={team.clubId}>
            <TableCell>{team.position}</TableCell>
            <TableCell className='flex flex-col items-center gap-1 font-bold text-lg'>
              {!!team.Club.badge && <img className='w-10' src={team.Club.badge} />}
              {team.Club.name}
            </TableCell>
            <TableCell>{team.points}</TableCell>
            <TableCell>{team.played}</TableCell>
            <TableCell>{team.win}</TableCell>
            <TableCell>{team.draw}</TableCell>
            <TableCell>{team.loose}</TableCell>
            <TableCell>{team.goals}</TableCell>
            <TableCell>{team.conceed}</TableCell>
            <TableCell>{team.yellows}</TableCell>
            <TableCell>{team.reds}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
