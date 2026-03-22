import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext'; // 👈 1. Import Cart hook
import Button from '@mui/material/Button';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'; // 👈 2. Import MUI icon
import SearchBar from './SearchBar'; 
import CartSidebar from './CartSidebar'; // 👈 3. Import the new Sidebar

const Navbar = () => {
  const { user, logout } = useAuth();
  const { getItemCount } = useCart(); // 👈 4. Grab the total item count
  const navigate = useNavigate();
  
  // 5. State to control opening and closing the sidebar
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Left Side - Logo */}
            <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => navigate('/')}>
              <h1 className="text-2xl font-extrabold tracking-tight text-red-500">
                CraveCart<span className="text-gray-800">.</span>
              </h1>
            </div>

            {/* Middle - Search Bar */}
            <div className="flex-1 flex justify-center px-6">
              <SearchBar /> 
            </div>

            {/* Right Side - Cart, User Info & Logout */}
            <div className="flex items-center space-x-6">
              
              {/* 👇 The Global Cart Icon Button */}
              <div 
                className="relative cursor-pointer p-2 hover:bg-gray-50 rounded-full transition-colors"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingCartOutlinedIcon className="text-gray-700" />
                
                {/* The Red Notification Badge (Only shows if items > 0) */}
                {getItemCount() > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-white transform translate-x-1 -translate-y-1">
                    {getItemCount()}
                  </span>
                )}
              </div>

              {user ? (
                <div className="flex items-center space-x-4 border-l border-gray-200 pl-6">
                  <span className="text-sm font-medium text-gray-700 hidden sm:block">
                    Hi, {user.name || 'Chef'}
                  </span>
                  <Button variant="outlined" color="error" size="small" onClick={logout} sx={{ borderRadius: '20px' }}>
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="border-l border-gray-200 pl-6">
                  <Button variant="contained" color="error" size="small" onClick={() => navigate('/login')} sx={{ borderRadius: '20px' }}>
                    Login
                  </Button>
                </div>
              )}
            </div>
            
          </div>
        </div>
      </nav>

      {/* 👇 6. Mount the Sidebar globally here! */}
      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
      />
    </>
  );
};

export default Navbar;