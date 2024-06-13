import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Fixture({ className }: { className?: string }) {
  return (
    <Card className={className}>
      <CardHeader className='flex flex-row items-center'>
        <div className='grid gap-2'>
          <CardTitle>Fixture</CardTitle>
          <CardDescription>Fecha 6</CardDescription>
        </div>
        <Button asChild size='sm' className='ml-auto gap-1'>
          <Button>
            Ver todo
            <ArrowUpRight className='h-4 w-4' />
          </Button>
        </Button>
      </CardHeader>
      <CardContent>
        <div>team 1 vs team 2</div>
      </CardContent>
    </Card>
  );
}
