import { ThemeProvider } from './components/theme-provider';
import Index from './views/Index';

function App() {
  return (
    <ThemeProvider defaultTheme='dark'>
      <Index />
    </ThemeProvider>
  );
}

export default App;
