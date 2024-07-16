import { Button } from '@/components/ui/button';
import '@/styles/layouts/header.css';
import { ModeToggle } from '@/theme/toggle-theme';
import { Bolt } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className='flex justify-between mt-4 px-10'>
      <Link to='/' className='gradient-text-style flex-1'>
        Fast Tournament
      </Link>
      <ModeToggle />
      <Link to='/config' className='gradient-text-style'>
        <Button variant='outline' size='icon' className='ms-2' title='Configuración'>
          <Bolt />
        </Button>
      </Link>
    </header>
  );
}
