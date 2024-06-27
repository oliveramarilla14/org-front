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

            {/* clubes */}
            <Route path='/clubs' element={<Clubs />} />
            <Route path='/clubs/crear' element={<ClubCreate />} />
            <Route path='/clubs/:id' element={<ClubShow />} />

            {/* Jugadores*/}
            <Route path='/players/add' element={<PlayerCreate />} />
            <Route path='/test' element={<Test />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </ThemeProvider>
      </SWRConfig>
    </>
  );
}

export default App;
