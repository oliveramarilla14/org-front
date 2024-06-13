import { Route, Routes } from 'react-router-dom';
import Index from './views/Index';
import Positions from './views/Positions.view';
import { ThemeProvider } from './theme/theme-provider';

function App() {
  return (
    <>
      <ThemeProvider defaultTheme='dark'>
        <Routes>
          <Route path='/' element={<Index />} />
          <Route path='/positions' element={<Positions />} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
