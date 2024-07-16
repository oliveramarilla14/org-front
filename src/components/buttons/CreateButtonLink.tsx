import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { CirclePlus } from 'lucide-react';

type Props = {
  className?: string;
  to?: string;
};

export default function CreateButtonLink({ className, to }: Props) {
  return (
    <Link to={to ?? './crear'}>
      <Button size='lg' className={`${className}`}>
        <CirclePlus />
        <span className='hidden md:inline'>&nbsp; Agregar</span>
      </Button>
    </Link>
  );
}
