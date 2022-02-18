import React from 'react';
import './App.css';
import Header from './components/Header';
import Login from './components/Login'
import Home from './components/Home';
import Detail from './components/Detail';
import {
  Routes,
  Route
} from "react-router-dom";

function App() {

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/detail/:id" element={<Detail />} />
      </Routes>
    </div>
  );
}

export default App;
