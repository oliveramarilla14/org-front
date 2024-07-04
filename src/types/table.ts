import { FilterFn } from '@tanstack/react-table';
import { RowData } from '@tanstack/react-table';

declare module '@tanstack/react-table' {
  //los tipos no se usan, pero al extender una interface debe mantenerse el tipado
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant?: 'text' | 'range' | 'select' | 'boolean';
  }

  interface FilterFns {
    deadline: FilterFn<unknown>;
  }
}
