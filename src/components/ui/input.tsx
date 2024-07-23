import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  const numberInputOnWheelPreventChange = (e: React.WheelEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;

    // Prevent the input value change
    target.blur();

    // Prevent the page/container scrolling
    e.stopPropagation();

    // // Refocus immediately, on the next tick (after the current)
    // setTimeout(() => {
    //   target.focus();
    // }, 0);
  };

  return (
    <input
      type={type}
      onWheel={numberInputOnWheelPreventChange}
      className={cn(
        'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = 'Input';

export { Input };
