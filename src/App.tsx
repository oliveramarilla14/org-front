import { Route, Routes } from 'react-router-dom';
import Index from './views/Index';
import Positions from './views/Positions.view';
import { ThemeProvider } from './theme/theme-provider';
import Clubs from './views/clubs/Clubs.view';
import NotFound from './Layouts/NotFound';
import ClubShow from './views/clubs/club.show';
import Test from './components/test';
import ClubCreate from './views/clubs/club.create';
import PlayerCreate from './views/players/player.create';
import { SWRConfig } from 'swr';
import { useToast } from './components/ui/use-toast';
import { CustomAxiosError } from './types/error';
import { errorToast } from './components/toast/errorToast';
import StatsView from './views/stats/stats.view';
import CuotasView from './views/Cuotas/cuotas.view';
import MultasView from './views/multas/multas.view';
import MultasCreate from './views/multas/multas.create';
import MultasEdit from './views/multas/multas.edit';
import AmonestationsView from './views/amonestations/amonestations.view';
import MultaShow from './views/multas/multas.show';
import AmonestationCreate from './views/amonestations/amonestations.create';
import AmonestationEdit from './views/amonestations/amonestations.edit';
import FixtureView from './views/fixture/fixture.view';
import MatchShow from './views/matches/match.show';
import ConfigView from './views/config/config.view';

function App() {
  const { toast } = useToast();

  return (
    <>
      <SWRConfig
        value={{
          onError: (error: CustomAxiosError) => errorToast(toast, error)
        }}
      >
        <ThemeProvider defaultTheme='dark'>
          <Routes>
            <Route path='/' element={<Index />} />
            <Route path='/positions' element={<Positions />} />
            <Route path='/fixture' element={<FixtureView />} />

            <Route path='/matches/:id' element={<MatchShow />} />

            {/* clubes */}
            <Route path='/clubs' element={<Clubs />} />
            <Route path='/clubs/crear' element={<ClubCreate />} />
            <Route path='/clubs/:id' element={<ClubShow />} />

            {/* Jugadores*/}
            <Route path='/players/add' element={<PlayerCreate />} />

            {/* Estadísticas */}
            <Route path='/stats' element={<StatsView />} />

            <Route path='/cuotas' element={<CuotasView />} />
            <Route path='/pagos' element={<MultasView />} />
            <Route path='/pagos/crear' element={<MultasCreate />} />
            <Route path='/pagos/:id' element={<MultaShow />} />
            <Route path='/pagos/:id/edit' element={<MultasEdit />} />

            <Route path='/amonestations' element={<AmonestationsView />} />
            <Route path='/amonestations/crear' element={<AmonestationCreate />} />
            <Route path='/amonestations/:id/edit' element={<AmonestationEdit />} />

            <Route path='/config' element={<ConfigView />} />

            <Route path='/test' element={<Test />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </ThemeProvider>
      </SWRConfig>
    </>
  );
}

export default App;
