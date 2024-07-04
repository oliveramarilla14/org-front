import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '../ui/calendar';
import { format } from 'date-fns';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { Dispatch, SetStateAction } from 'react';
import { es } from 'date-fns/locale';

interface Props {
  date: DateRange | undefined;
  setDate: Dispatch<SetStateAction<DateRange | undefined>>;
}

export default function DateRangeComponent({ date, setDate }: Props) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id='date'
          variant={'outline'}
          className={cn(' justify-start text-left font-normal', !date && 'text-muted-foreground')}
        >
          <CalendarIcon className='mr-2 h-4 w-4' />
          {date?.from ? (
            date.to ? (
              <>
                {format(date.from, 'LLL dd, y', { locale: es })} - {format(date.to, 'LLL dd, y', { locale: es })}
              </>
            ) : (
              format(date.from, 'LLL dd, y', { locale: es })
            )
          ) : (
            <span>Seleccione un rango</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0' align='start'>
        <Calendar
          initialFocus
          locale={es}
          mode='range'
          defaultMonth={date?.from}
          selected={date}
          onSelect={setDate}
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
  );
}
