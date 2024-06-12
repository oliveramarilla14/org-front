import type { ChildrenProps } from '@/types/children';
import Container from './Container';
import Header from './Header';
type Props = ChildrenProps;

export default function Layout({ children }: Props) {
  //cambiar container por container de tailwind
  return (
    <>
      <Header />
      <Container>{children}</Container>
    </>
  );
}
