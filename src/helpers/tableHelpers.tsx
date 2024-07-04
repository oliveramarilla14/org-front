import { Button } from '@/components/ui/button';
import { Column, Row } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { DateRange } from 'react-day-picker';

export function sortableHeader<T>(text: string) {
  return ({ column }: { column: Column<T> }) => {
    return (
      <>
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          {text}
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      </>
    );
  };
}

export const filterByDateRange = (row: Row<unknown>, id: string, filterValue: DateRange | null) => {
  const deadline = new Date(row.getValue(id));
  if (!filterValue || !filterValue.from || !filterValue.to) {
    return true;
  }
  return deadline >= filterValue.from && deadline <= filterValue.to;
};
