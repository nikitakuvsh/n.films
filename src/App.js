import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, HashRouter } from 'react-router-dom';
import SearchFilms from '../src/components/SearchFilms/SearchFilms';
import Home from './components/Home';
import Header from './components/Index/Header/Header';
import './App.css';

const App = () => {
  return (
    <HashRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search-films" element={<SearchFilms />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
