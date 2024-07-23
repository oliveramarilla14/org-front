import { Column } from '@tanstack/react-table';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useEffect, useMemo, useState } from 'react';
import { DateRange } from 'react-day-picker';
import DateRangeComponent from './DateRange';

interface Props<TData> {
  column: Column<TData, unknown>;
}

export default function FilterInput<TData>({ column }: Props<TData>) {
  const columnFilterValue = column.getFilterValue();
  const { filterVariant } = column.columnDef.meta ?? {};
  const [date, setDate] = useState<DateRange | undefined>();

  const uniqueValues = useMemo(() => {
    const values = column.getFacetedUniqueValues?.() ?? [];
    return Array.from(new Set(values));
  }, [column]);

  useEffect(() => {
    if (date?.from && date?.to) {
      column.setFilterValue(() => date);
    }
  }, [date, column]);

  return filterVariant === 'range' ? (
    <div>
      <DateRangeComponent date={date} setDate={setDate} />
    </div>
  ) : filterVariant === 'select' ? (
    <Select
      onValueChange={(val) => (val === 'all' ? column.setFilterValue('') : column.setFilterValue(val))}
      defaultValue='all'
    >
      <SelectTrigger>
        <SelectValue placeholder='' />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='all'>Todo</SelectItem>
        {uniqueValues.map((value) => {
          return (
            <SelectItem key={value[1] + '_selectFilter' + value[0]} value={value[0]}>
              {value[0]}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  ) : filterVariant === 'number' ? (
    <Input
      className='max-w-14 '
      type='number'
      onChange={(val) => {
        column.setFilterValue(val.target.value);
      }}
      value={(columnFilterValue ?? '') as number}
    />
  ) : (
    <Input
      className='max-w-40 '
      onChange={(val) => {
        column.setFilterValue(val.target.value);
      }}
      value={(columnFilterValue ?? '') as string}
    />
  );
}
