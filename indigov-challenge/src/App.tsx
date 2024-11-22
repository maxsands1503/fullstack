import { PrimeReactProvider } from 'primereact/api';
import './App.css';
import Home from './Home';
import 'primeicons/primeicons.css';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import Tailwind from 'primereact/passthrough/tailwind';

function App() {
  return (
    <PrimeReactProvider  value={{ unstyled: true, pt: Tailwind }}>
        <Home />
    </PrimeReactProvider>
);
}

export default App;
