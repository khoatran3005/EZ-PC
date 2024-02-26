import logo from './logo.svg';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header/Header';
import Homepage from './components/Home/Homepage';
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="app-container">
      <div className='header-container'>
        <Header />
      </div>
      <div className='main-container'>

        <Outlet></Outlet>

      </div>

    </div>
  );
}

export default App;
