import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar/Navbar';
import LandingPage from './Pages/LandingPage';
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  return (
    <div className="App">

      
<LandingPage/>
    </div>
  );
}

export default App;
