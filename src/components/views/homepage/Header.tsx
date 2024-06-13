import { HeadTitle } from '@/components/fonts/headers';

type Props = {
  title: string;
};

export default function Header({ title }: Props) {
  return (
    <div className='mt-10'>
      <HeadTitle>{title}</HeadTitle>
    </div>
  );
}
