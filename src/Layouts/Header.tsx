import '@/styles/layouts/header.css';
import { ModeToggle } from '@/theme/toggle-theme';

export default function Header() {
  return (
    <header className='flex justify-between mt-4 px-10'>
      <h1 className='gradient-text-style'>Fast Tournament</h1>
      <ModeToggle />
    </header>
  );
}
