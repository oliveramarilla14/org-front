import type { ChildrenProps } from '@/types/children';
import Header from './Header';
type Props = ChildrenProps;

export default function Layout({ children }: Props) {
  return (
    <>
      <Header />
      <div className='container'>{children}</div>
    </>
  );
}
