import { TeamShow } from '@/types/clubs';
import Header from '../homepage/Header';

interface Props {
  club?: TeamShow;
}

export default function ShowClubData({ club }: Props) {
  return (
    <>
      <Header title={club?.name || ''} />
    </>
  );
}
