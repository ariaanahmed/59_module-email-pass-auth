import React from 'react';
import Header from './Components/Header/Header';
import { Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
const App = () => {
  return (
    <div>
      <Header/>
      <Outlet/>
    </div>
  );
};

export default App;