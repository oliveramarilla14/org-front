import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { Club } from '@/types/clubs';
import { useNavigate } from 'react-router-dom';
import { storageUri } from '@/config/config';

interface Props {
  club: Club;
  className?: string;
  size: number;
}

export default function ClubItem({ club, className, size }: Props) {
  const navigate = useNavigate();
  const handleClick = (id: number) => {
    navigate(`./${id}`);
  };
  return (
    <Card
      className={`${className} md:col-span-${size}  cursor-pointer group-hover:opacity-20 hover:!opacity-100`}
      onClick={() => handleClick(club.id)}
    >
      <CardHeader className='items-center gap-2'>
        <Avatar className='h-20 w-20'>
          <AvatarImage src={club?.badge ? `${storageUri}/files/badge/${club.badge}` : ''} className='object-cover' />
          <AvatarFallback>{club.name.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <CardTitle>{club.name}</CardTitle>
      </CardHeader>
    </Card>
  );
}
