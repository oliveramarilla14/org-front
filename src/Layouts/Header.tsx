import { ModeToggle } from '@/components/toggle-theme';
import '@/styles/layouts/header.css';

export default function Header() {
  return (
    <header className='flex justify-between mt-4 px-10'>
      <h1 className='gradient-text-style'>Fast Tournament</h1>
      <ModeToggle />
    </header>
  );
}
