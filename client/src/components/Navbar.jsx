import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '@mui/material/Button';
// 👇 FIX: Import the new SearchBar file we just created!
import SearchBar from './SearchBar'; 

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Left Side - Logo */}
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => navigate('/')}>
            <h1 className="text-2xl font-extrabold tracking-tight text-red-500">
              food talks<span className="text-gray-800">.</span>
            </h1>
          </div>

          {/* Middle - Render the isolated Search Bar component */}
          <div className="flex-1 flex justify-center px-6">
            {/* 👇 FIX: Use the SearchBar component here! */}
            <SearchBar /> 
          </div>

          {/* Right Side - User Info & Logout */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-sm font-medium text-gray-700 hidden sm:block">
                  Hi, {user.name || 'Chef'}
                </span>
                <Button variant="outlined" color="error" size="small" onClick={logout} sx={{ borderRadius: '20px' }}>
                  Logout
                </Button>
              </>
            ) : (
              <Button variant="contained" color="error" size="small" onClick={() => navigate('/login')} sx={{ borderRadius: '20px' }}>
                Login
              </Button>
            )}
          </div>
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;