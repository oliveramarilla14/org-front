import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { NumberKeys } from '@/types/helpers';
import { PlayerStatsWithData } from '@/types/players';
import { useEffect, useState } from 'react';

type Props = {
  stats: PlayerStatsWithData[];
  renderCells: (stats: PlayerStatsWithData) => JSX.Element;
  columns: string[];
  sortBy: NumberKeys<PlayerStatsWithData>;
};

export default function StatsTable({ stats, renderCells, columns, sortBy }: Props) {
  const [empty, setEmpty] = useState(false);
  useEffect(() => {
    if (stats.length == 0) {
      setEmpty(true);
    } else {
      setEmpty(false);
    }
  }, [stats]);

  return (
    <Table className='mt-4 '>
      <TableHeader>
        <TableRow className='text-lg'>
          {columns.map((column) => (
            <TableHead key={column}>{column}</TableHead>
          ))}
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

        {sortBy &&
          stats
            .sort((a, b) => b[sortBy] - a[sortBy])
            .map((stat, i) => (
              <TableRow className='text-lg' key={stat.playerId}>
                <TableCell>{i + 1}</TableCell>

                {renderCells(stat)}
              </TableRow>
            ))}
      </TableBody>
    </Table>
  );
}
