import Layout from '@/Layouts/Layout';
import { generateFixtureFetcher } from '@/api/create';
import ActionModal from '@/components/modals/ActionModal';
import { Button } from '@/components/ui/button';
import { Pagination, PaginationContent, PaginationItem } from '@/components/ui/pagination';
import { FixtureTable } from '@/components/views/fixtures/fixtureTable';
import { apiUri } from '@/config/config';
import { getLocalFecha, setLocalFecha } from '@/helpers/localStorage.helper';
import { FixtureMatch } from '@/types/matches';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

export default function FixtureView() {
  const fechaInit = getLocalFecha();

  const [fecha, setFecha] = useState(fechaInit ? parseInt(fechaInit) : 1);
  const [openConfirm, setOpenConfirm] = useState(false);
  const { data: matches, isLoading, mutate } = useSWR<FixtureMatch[]>(`${apiUri}/matches`);
  const { trigger } = useSWRMutation(`${apiUri}/matches/fixture/generate`, generateFixtureFetcher);

  useEffect(() => {
    setLocalFecha(fecha);
  }, [fecha]);

  const maxFecha = useMemo(() => {
    return matches
      ? matches.reduce((max, match) => {
          return match.fecha > max ? match.fecha : max;
        }, 0)
      : 1;
  }, [matches]);

  const handleGenerate = async () => {
    await trigger();
    mutate();
    setOpenConfirm(false);
  };

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
      {!matches || matches?.length === 0 ? (
        <div className='flex flex-col mt-5 items-center gap-5'>
          No existe un fixture
          <Button onClick={() => setOpenConfirm(true)}>Generar fixture</Button>
          <p className='text-muted-foreground text-sm'>Generar solo al tener todos los equipos registrados!</p>
        </div>
      ) : (
        <FixtureTable matches={matches} fecha={fecha} />
      )}

      <ActionModal
        open={openConfirm}
        onOpenChange={setOpenConfirm}
        onConfirm={handleGenerate}
        variant='default'
        title='Generar Fixture'
        description='Se generara un fixture con los equipos existentes, no se podrá agregar equipos al fixture creado.'
      />
    </Layout>
  );
}
