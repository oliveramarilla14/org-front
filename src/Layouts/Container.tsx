import type { ChildrenProps } from '@/types/children';

type ContainerProps = {
  maxWidth?: string;
};
type Props = ChildrenProps & ContainerProps;

export default function Container({ children, maxWidth = '1200px' }: Props) {
  return <div style={{ maxWidth, margin: '0 auto' }}>{children}</div>;
}
