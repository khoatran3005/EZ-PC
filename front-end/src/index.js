import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Homepage from './components/Home/Homepage';
import Info from './components/Input/Info';
import Suggestions from './components/Suggestions/Suggest';
import { UserContext } from './contexts/UserContext';


const root = ReactDOM.createRoot(document.getElementById('root'));

function AppWrapper() {
  const [user, setUser] = useState();

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <Routes>
          <Route element={<App />}>
            <Route path="/" element={<Homepage />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="/info" element={<Info />} />
            <Route path="/computerList" element={<computerList />} />
            <Route path="/suggest" element={<Suggestions />} />

          </Route>
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
    // <React.StrictMode>

    /* </React.StrictMode> */
  );
}

root.render(<AppWrapper />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
