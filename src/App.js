import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchPage from './SearchPage';
import RecipeDetailPage from './RecipeDetailPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/recipes/:id" element={<RecipeDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;

