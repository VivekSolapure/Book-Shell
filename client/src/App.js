// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BookListingPage from './pages/BookListingPage';
import UserProfile from './components/UserProfile';
import BookDetailPage from './components/BookDetailPage';
import LoginPage from './pages/LoginPage';
import Navbar from './components/Navbar';
import { useState } from 'react';

function App() {
    const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('');
  return (
    <Router>
        <Navbar
          onSearchChange={(term) => setSearchTerm(term)}
          onFilterChange={(f) => setFilter(f)}
        />
      <Routes>
        <Route path="/" element={<BookListingPage searchTerm={searchTerm} filter={filter} />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/books/:isbn" element={<BookDetailPage />} />
        <Route path="/Login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
