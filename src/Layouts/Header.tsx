import { Button } from '@/components/ui/button';
import '@/styles/layouts/header.css';
import { ModeToggle } from '@/theme/toggle-theme';
import { Bolt } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className='flex mt-4 px-10'>
      <div className=' flex-1'>
        <Link to='/' className='gradient-text-style'>
          Fast Tournament
        </Link>
      </div>
      <div className='flex gap-4'>
        <ModeToggle />
        <Link to='/config' className='gradient-text-style'>
          <Button variant='outline' size='icon' title='Configuración'>
            <Bolt />
          </Button>
        </Link>
      </div>
    </header>
  );
}
