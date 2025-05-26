import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const Navbar = ({ onSearchChange, onFilterChange }) => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-blue-700 via-purple-600 to-pink-500 text-white p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3 shadow-lg">
      <div className="text-2xl font-bold tracking-wide drop-shadow">
        <Link to="/">📚 BookReview</Link>
      </div>

      <div className="flex flex-col md:flex-row gap-3 items-start md:items-center">
        <input
          type="text"
          placeholder="Search by title..."
          onChange={(e) => onSearchChange(e.target.value)}
          className="text-black p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
        />

        <select
          onChange={(e) => onFilterChange(e.target.value)}
          className="text-black p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
        >
          <option value="">All Genres</option>
          <option value="Algorithmic Art">Algorithmic Art</option>
          <option value="Business">Business</option>
          <option value="Client Server">Client Server</option>
          <option value="Client-Server">Client-Server</option>
          <option value="Computer Graph">Computer Graph</option>
          <option value="Computer Graphics">Computer Graphics</option>
          <option value="In Action">In Action</option>
          <option value="Internet">Internet</option>
          <option value="Java">Java</option>
          <option value="Microsoft">Microsoft</option>
          <option value="Microsoft .NET">Microsoft .NET</option>
          <option value="Microsoft/.NET">Microsoft/.NET</option>
          <option value="Miscella">Miscella</option>
          <option value="Miscellaneous">Miscellaneous</option>
          <option value="Mobile">Mobile</option>
          <option value="Mobile Technology">Mobile Technology</option>
          <option value="Networking">Networking</option>
          <option value="Next Generation Databases">Next Generation Databases</option>
          <option value="Object-Oriented Programming">Object-Oriented Programming</option>
          <option value="Object-Technology Programming">Object-Technology Programming</option>
          <option value="Open Source">Open Source</option>
          <option value="P">P</option>
          <option value="PHP">PHP</option>
          <option value="Perl">Perl</option>
          <option value="PowerBuilder">PowerBuilder</option>
          <option value="Programming">Programming</option>
          <option value="Python">Python</option>
          <option value="S">S</option>
          <option value="SOA">SOA</option>
          <option value="Software Development">Software Development</option>
          <option value="Software Engineering">Software Engineering</option>
          <option value="Theory">Theory</option>
          <option value="Web Development">Web Development</option>
          <option value="XML">XML</option>
          <option value="internet">internet</option>
          <option value="java">java</option>
        </select>

        {user ? (
          <div className="flex gap-2 items-center">
            <span className="font-semibold">Hello, {user.name}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="bg-green-500 hover:bg-green-600 px-4 py-1 rounded transition"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;