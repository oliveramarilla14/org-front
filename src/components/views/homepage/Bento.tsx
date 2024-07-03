import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChildrenProps } from '@/types/children';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Props extends Partial<ChildrenProps> {
  title: string;
  className?: string;
  link: string;
}

export default function Bento({ title, children, className, link }: Props) {
  return (
    <Card className={className}>
      <CardHeader className='flex flex-row items-center'>
        <div className='grid gap-2'>
          <CardTitle>{title}</CardTitle>
        </div>
        <Button asChild size='sm' className='ml-auto gap-1'>
          <Link to={link} className='bg-transparent hover:bg-transparent'>
            <Button>
              <ArrowUpRight className='h-4 w-4' />
            </Button>
          </Link>
        </Button>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
