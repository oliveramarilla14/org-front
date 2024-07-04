import { Column } from '@tanstack/react-table';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useMemo } from 'react';

interface Props<TData> {
  column: Column<TData, unknown>;
}

export default function FilterInput<TData>({ column }: Props<TData>) {
  const columnFilterValue = column.getFilterValue();
  const { filterVariant } = column.columnDef.meta ?? {};

  const uniqueValues = useMemo(() => {
    const values = column.getFacetedUniqueValues?.() ?? [];
    return Array.from(new Set(values));
  }, [column]);

  return filterVariant === 'range' ? (
    <div className='flex'>
      {/* <Input
        onChange={(val) => {
          column.setFilterValue(val.target.value);
        }}
        type='date'
        value={(columnFilterValue ?? '') as string}
      />
      <Input
        type='date'
        onChange={(val) => {
          column.setFilterValue(val.target.value);
        }}
        value={(columnFilterValue ?? '') as string}
      /> */}
    </div>
  ) : filterVariant === 'select' ? (
    <>
      <Select onValueChange={(val) => column.setFilterValue(val)}>
        <SelectTrigger>
          <SelectValue placeholder='' />
        </SelectTrigger>
        <SelectContent>
          {uniqueValues.map((value) => {
            return (
              <SelectItem key={value[1]} value={value[0]}>
                {value[0]}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </>
  ) : (
    <>
      <Input
        className='max-w-40 '
        onChange={(val) => {
          column.setFilterValue(val.target.value);
        }}
        value={(columnFilterValue ?? '') as string}
      />
    </>
  );
}
