import logo from './logo.svg';
import './App.css';
import Navigation from './Naviation';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Navigation />
    </BrowserRouter>
  );
}

export default App;
