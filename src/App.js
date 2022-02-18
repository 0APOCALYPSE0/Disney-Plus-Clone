import React from 'react';
import { Counter } from './features/counter/Counter';
import './App.css';
import Header from './components/Header';
import Login from './components/Login'
import Home from './components/Home';
import Detail from './components/Detail';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {

  return (
    <div className="App">
      <Header />
      <Router>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/detail" element={<Detail />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
