import { Card, CardContent } from '@/components/ui/card';
import { RectangleVertical, TableProperties } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TeamShow } from '@/types/clubs';

interface Props {
  club: TeamShow;
}

export default function ShowStats({ club }: Props) {
  return (
    <Card>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <TableProperties />
              </TableHead>
              <TableHead>
                <i className='fa-sharp fa-regular fa-futbol'></i>
              </TableHead>
              <TableHead>
                <RectangleVertical className='text-yellow-500' />
              </TableHead>
              <TableHead>
                <RectangleVertical className='text-red-500' />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>{club?.Stats?.position ?? '-'}</TableCell>
              <TableCell>{club?.Stats?.goals ?? '-'}</TableCell>
              <TableCell>{club?.Stats?.yellows ?? '-'}</TableCell>
              <TableCell>{club?.Stats?.reds ?? '-'}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
