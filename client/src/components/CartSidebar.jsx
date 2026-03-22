import React from 'react';
import { useCart } from '../context/CartContext';
import CloseIcon from '@mui/icons-material/Close';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const CartSidebar = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, getCartTotal } = useCart();

  return (
    <>
      {/* 1. The Dark Overlay (Clicking this closes the cart) */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* 2. The Sliding Sidebar Panel */}
      <div 
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } flex flex-col`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900">Your Order</h2>
          <button 
            onClick={onClose} 
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Scrollable Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <span className="text-6xl mb-4">🛒</span>
              <p className="text-lg font-medium">Your cart is empty</p>
              <p className="text-sm">Looks like you haven't added any food yet!</p>
            </div>
          ) : (
            <div className="space-y-6">
              {cart.map((item) => (
                <div key={item._id} className="flex justify-between items-center bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900">{item.dishName}</h3>
                    <p className="text-sm text-gray-500">{item.restaurantName}</p>
                    <p className="text-red-500 font-semibold mt-1">
                      ₹{item.price} <span className="text-gray-400 text-sm font-normal">x {item.quantity}</span>
                    </p>
                  </div>
                  
                  {/* Delete Item Button */}
                  <button 
                    onClick={() => removeFromCart(item._id)}
                    className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors ml-4"
                  >
                    <DeleteOutlineIcon />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sticky Footer with Total & Checkout */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-gray-100 bg-white">
            <div className="flex justify-between items-center mb-6">
              <span className="text-lg font-medium text-gray-600">Subtotal</span>
              <span className="text-2xl font-bold text-gray-900">₹{getCartTotal()}</span>
            </div>
            
            <button 
              onClick={() => alert("Proceeding to checkout! 🚀")}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-4 rounded-full shadow-lg transition-transform active:scale-95 text-lg"
            >
              Checkout Now
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;