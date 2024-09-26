import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import SearchFilms from '../src/components/SearchFilms/SearchFilms';
import Home from './components/Home';
import Header from './components/Index/Header/Header';
import './App.css';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search-films" element={<SearchFilms />} />
      </Routes>
    </Router>
  );
};

export default App;
