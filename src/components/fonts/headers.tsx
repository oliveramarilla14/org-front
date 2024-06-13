type Props = {
  children: string;
};

export const HeadTitle = ({ children }: Props) => {
  return <h2 className='text-3xl font-bold '>{children}</h2>;
};
