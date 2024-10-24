import React, { useState } from 'react';
import { BsPersonCircle, BsJustify, BsX } from 'react-icons/bs'; // Ensure you import these
import { useNavigate } from 'react-router-dom'; // To redirect after logging out
import './App.css';

function Header({ openSidebarToggle, OpenSidebar }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const token = localStorage.getItem('token'); // Check if token exists in local storage
  const navigate = useNavigate(); // Hook for navigation

  // Toggle dropdown when clicking the user icon
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Handle log out
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from local storage
    navigate('/Login'); // Redirect to login page
  };

  return (
    <header className='header'>
      <div className='menu-icon' onClick={OpenSidebar}>
        {openSidebarToggle ? <BsX className='icon' /> : <BsJustify className='icon' />}
      </div>
      <div className='header-right'>
        <BsPersonCircle className='icon' onClick={toggleDropdown} />
        {isDropdownOpen && token && (
          <div className='dropdown'>
            <button onClick={handleLogout} className='dropdown-item' >
              Log out
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
