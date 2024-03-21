import React from 'react';
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
import Info from './components/Info';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route element={<App />}>
        <Route path="/" element={<Homepage />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="/info" component={Info} />
      </Route>
    </Routes>
  </BrowserRouter>
  // <React.StrictMode>

  /* </React.StrictMode> */
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
