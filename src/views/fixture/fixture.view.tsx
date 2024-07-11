import Layout from '@/Layouts/Layout';
import { Button } from '@/components/ui/button';
import { Pagination, PaginationContent, PaginationItem } from '@/components/ui/pagination';
import { FixtureTable } from '@/components/views/fixtures/fixtureTable';
import { apiUri } from '@/config/config';
import { FixtureMatch } from '@/types/matches';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useMemo, useState } from 'react';
import useSWR from 'swr';

export default function FixtureView() {
  const [fecha, setFecha] = useState(1);
  const { data: matches, isLoading } = useSWR<FixtureMatch[]>(`${apiUri}/matches`);

  const maxFecha = useMemo(() => {
    return matches
      ? matches.reduce((max, match) => {
          return match.fecha > max ? match.fecha : max;
        }, 0)
      : 1;
  }, [matches]);

  return (
    <Layout title='Fixture' isLoading={isLoading}>
      <div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <Button variant='ghost' onClick={() => setFecha((prev) => prev - 1)} disabled={fecha === 1}>
                <ChevronLeft className='h-4 w-4' />
                Anterior
              </Button>
            </PaginationItem>
            <PaginationItem>
              <p className='text-lg mx-5 underline text-center'>Fecha {fecha}</p>
            </PaginationItem>

            <PaginationItem>
              <Button variant='ghost' onClick={() => setFecha((prev) => prev + 1)} disabled={fecha >= maxFecha}>
                Siguiente
                <ChevronRight className='h-4 w-4' />
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      <FixtureTable matches={matches ?? []} fecha={fecha} />
    </Layout>
  );
}
