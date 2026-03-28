import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext'; 
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'; 
import SearchBar from './SearchBar'; 
import CartSidebar from './CartSidebar'; 

const Navbar = () => {
  const { user, logout } = useAuth();
  const { getItemCount } = useCart(); 
  const navigate = useNavigate();

  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      
      <nav className="fixed top-0 w-full z-50 bg-neutral-950/80 backdrop-blur-md border-b border-white/10 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20"> 
            
            
            <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => navigate('/')}>
              <h1 className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                Bitezy.
              </h1>
            </div>

            {/* SearchBar */}
            <div className="flex-1 flex justify-center px-4 sm:px-6">
              <div className="w-full max-w-md">
                <SearchBar /> 
              </div>
            </div>

           
            <div className="flex items-center space-x-3 sm:space-x-6">
              
              
              <div 
                className="relative cursor-pointer p-2 rounded-full hover:bg-white/10 transition-colors group"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingCartOutlinedIcon className="text-gray-300 group-hover:text-white transition-colors" />
                
                {getItemCount() > 0 && (
                  <span className="absolute top-0 right-0 bg-gradient-to-r from-orange-500 to-red-500 text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-neutral-950 transform translate-x-1 -translate-y-1 shadow-md">
                    {getItemCount()}
                  </span>
                )}
              </div>

              
              {user ? (
                <div className="flex items-center space-x-4 border-l border-white/10 pl-4 sm:pl-6">
                  <span className="text-sm font-medium text-gray-300 hidden sm:block">
                    Hi, <span className="text-white font-bold">{user.name || 'Chef'}</span>
                  </span>
                  <button 
                    onClick={logout} 
                    className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full text-sm font-bold border border-white/10 backdrop-blur-md transition-all"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="border-l border-white/10 pl-4 sm:pl-6">
                  <button 
                    onClick={() => navigate('/login')} 
                    className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-5 sm:px-6 py-2 rounded-full text-sm font-bold shadow-[0_0_15px_rgba(249,115,22,0.4)] hover:shadow-[0_0_25px_rgba(249,115,22,0.6)] transition-shadow"
                  >
                    Login
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>
      </nav>

      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
      />
    </>
  );
};

export default Navbar;