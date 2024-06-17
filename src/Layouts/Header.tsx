import '@/styles/layouts/header.css';
import { ModeToggle } from '@/theme/toggle-theme';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className='flex justify-between mt-4 px-10'>
      <Link to='/' className='gradient-text-style'>
        Fast Tournament
      </Link>
      <ModeToggle />
    </header>
  );
}
