/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/oKutIJucDeW
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

/** Add fonts into your Next.js project:

import { Inter } from 'next/font/google'

inter({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from '@/components/ui/table';
import { Button } from '@/components/ui/button';

export function V0FixtureTable() {
  return (
    <div className='border rounded-lg w-full'>
      <div className='relative w-full overflow-auto'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Team 1</TableHead>
              <TableHead>Match Time</TableHead>
              <TableHead>Team 2</TableHead>
              <TableHead className='text-right'>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className='font-medium'>Arsenal</TableCell>
              <TableCell>3:00 PM</TableCell>
              <TableCell className='font-medium'>Chelsea</TableCell>
              <TableCell className='text-right'>
                <Button className='mr-2' size='sm' variant='outline'>
                  View Details
                </Button>
                <Button size='sm'>Mark as Completed</Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className='font-medium'>Manchester United</TableCell>
              <TableCell>5:30 PM</TableCell>
              <TableCell className='font-medium'>Liverpool</TableCell>
              <TableCell className='text-right'>
                <Button className='mr-2' size='sm' variant='outline'>
                  View Details
                </Button>
                <Button size='sm'>Mark as Completed</Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className='font-medium'>Barcelona</TableCell>
              <TableCell>8:00 PM</TableCell>
              <TableCell className='font-medium'>Real Madrid</TableCell>
              <TableCell className='text-right'>
                <Button className='mr-2' size='sm' variant='outline'>
                  View Details
                </Button>
                <Button size='sm'>Mark as Completed</Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className='font-medium'>Bayern Munich</TableCell>
              <TableCell>10:30 PM</TableCell>
              <TableCell className='font-medium'>Juventus</TableCell>
              <TableCell className='text-right'>
                <Button className='mr-2' size='sm' variant='outline'>
                  View Details
                </Button>
                <Button size='sm'>Mark as Completed</Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
