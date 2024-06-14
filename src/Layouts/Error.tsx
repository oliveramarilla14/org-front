import { ServerCrash } from 'lucide-react';

type Props = {
  message: string;
};

export default function Error({ message }: Props) {
  return (
    <div className='flex justify-center mt-[100px] flex-col items-center '>
      <ServerCrash size={100} />
      <h1 className='text-6xl font-bold mt-2 '>Error!</h1>
      <p className='mt-2 '>{message}</p>
    </div>
  );
}
