import { Route, Routes } from 'react-router-dom';
import Index from './views/Index';
import Positions from './views/Positions.view';
import { ThemeProvider } from './theme/theme-provider';
import Clubs from './views/clubs/Clubs.view';
import NotFound from './Layouts/NotFound';
import ClubShow from './views/clubs/club.show';

function App() {
  return (
    <>
      <ThemeProvider defaultTheme='dark'>
        <Routes>
          <Route path='/' element={<Index />} />
          <Route path='/positions' element={<Positions />} />
          <Route path='/clubs' element={<Clubs />} />
          <Route path='/clubs/:id' element={<ClubShow />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
