import Header from './Header';
import { ReactNode } from 'react';
import Loading from './Loading';
import CreateButtonLink from '@/components/buttons/CreateButtonLink';
import { HeadTitle } from '@/components/fonts/headers';
import { Toaster } from '@/components/ui/toaster';

type Props = {
  children: ReactNode;
  isLoading?: boolean;
  title?: string;
  create?: boolean;
};

export default function Layout({ children, isLoading = false, title, create }: Props) {
  return (
    <>
      <Header />
      <div className='container mb-5'>
        <div className='mt-10 flex justify-between'>
          <HeadTitle>{title || ''}</HeadTitle>

          {create && !isLoading && <CreateButtonLink />}
        </div>

        {isLoading ? <Loading /> : children}
      </div>
      <Toaster />
    </>
  );
}
