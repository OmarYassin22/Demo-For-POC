import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoLogOutOutline } from 'react-icons/io5'; // Import the logout icon

import '../styles/Header.css'; // Optional, if you want to add custom styling for the header

const Header: React.FC = () => {
  const navigate = useNavigate(); // Using useNavigate hook for navigation

  const handleLogout = () => {
    localStorage.setItem("isLoggedIn", "false");
    // Add logic to clear session or token if needed
    navigate('/login'); // Redirect to login page
  };

  return (
    <header className="header">
      <div className="header-title">بناء</div>
      <button onClick={handleLogout} className="logout-btn">
        <IoLogOutOutline size={24} /> {/* Displaying logout icon */}
     
      </button>
    </header>
  );
};

export default Header;
