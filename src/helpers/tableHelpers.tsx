import { Button } from '@/components/ui/button';
import { Column } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

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
