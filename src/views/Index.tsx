import Layout from '@/Layouts/Layout';
import Fixture from '@/components/views/homepage/Fixtures';
import Header from '@/components/views/homepage/Header';

export default function Index() {
  return (
    <Layout>
      <Header title='Exa Campoverde' />

      <div className='grid md:grid-cols-5 gap-4 mt-4'>
        <Fixture className='md:col-span-3' />
        <Fixture className='md:col-span-2' />
      </div>
    </Layout>
  );
}
