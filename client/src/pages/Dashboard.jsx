import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import { fetchRestaurantOrders, updateOrderStatus } from "../services/shopService"; 
import { motion, AnimatePresence } from "framer-motion";
import { useRef } from "react";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";

import UploadReelForm from '../components/reels/UploadReelForm';
import MyReels from '../components/reels/MyReels';


const OrderCard = React.memo(({ order, index, getStatusColor, handleStatusChange }) => {
 
  const animationDelay = Math.min(index * 0.05, 0.5); 

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }} 
      animate={{ opacity: 1, scale: 1 }} 
      transition={{ delay: animationDelay }} // Using our newly optimized delay
      className="bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 overflow-hidden hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] transition-all flex flex-col"
    >
      <div className="bg-white/5 p-5 border-b border-white/10 flex justify-between items-center">
        <span className="font-mono text-sm font-bold text-gray-400">#{order._id.slice(-6).toUpperCase()}</span>
        <span className={`px-4 py-1.5 rounded-full text-xs font-bold border ${getStatusColor(order.status)}`}>
          {order.status}
        </span>
      </div>

      <div className="p-6 flex-1">
        <p className="text-sm text-gray-400 mb-5">Customer: <span className="font-bold text-white text-base ml-1">{order.customerName || "Guest"}</span></p>
        
        <div className="space-y-4 mb-8">
          {order.items.map((item, idx) => (
            <div key={idx} className="flex justify-between text-sm">
              <span className="font-medium text-gray-200">
                <span className="text-orange-500 font-bold mr-3 text-base">{item.quantity}x</span> 
                {item.dishName}
              </span>
              <span className="text-gray-400">₹{item.price * item.quantity}</span>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center pt-5 border-t border-white/10">
          <span className="font-bold text-gray-400">Total</span>
          <span className="text-2xl font-black text-white">₹{order.totalAmount}</span>
        </div>
      </div>

      <div className="p-5 bg-black/20 border-t border-white/10 flex gap-2 mt-auto">
        {order.status === "Pending" && (
          <button 
            onClick={() => handleStatusChange(order._id, "Preparing")}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition-all shadow-[0_0_15px_rgba(37,99,235,0.3)] hover:shadow-[0_0_25px_rgba(37,99,235,0.5)] flex justify-center items-center gap-2 active:scale-95"
          >
            <LocalDiningIcon fontSize="small" /> Accept & Prepare
          </button>
        )}
        {order.status === "Preparing" && (
          <button 
            onClick={() => handleStatusChange(order._id, "Delivered")}
            className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3 rounded-xl transition-all shadow-[0_0_15px_rgba(22,163,74,0.3)] hover:shadow-[0_0_25px_rgba(22,163,74,0.5)] flex justify-center items-center gap-2 active:scale-95"
          >
            <CheckCircleOutlineIcon fontSize="small" /> Mark Delivered
          </button>
        )}
        {order.status === "Delivered" && (
          <button disabled className="w-full bg-white/5 border border-white/10 text-gray-500 font-bold py-3 rounded-xl cursor-not-allowed">
            Order Complete
          </button>
        )}
      </div>
    </motion.div>
  );
});



const Dashboard = () => {
  const { user, token } = useAuth();
  
  const [activeTab, setActiveTab] = useState("orders");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const hasFetched = useRef(false);
  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await fetchRestaurantOrders(token);
        setOrders(data);
      } catch (error) {
        console.error("Failed to load orders", error);
      } finally {
        setLoading(false);
      }
    };

    // 👇 2. Only fetch if we have a token AND we haven't fetched yet!
    if (token && !hasFetched.current) {
      hasFetched.current = true; // Lock the shield immediately!
      loadOrders();
    } else if (!token) {
      setLoading(false); 
    }
  }, [token]);

 
  const handleStatusChange = useCallback(async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus, token);
      setOrders(prevOrders => prevOrders.map(order => 
        order._id === orderId ? { ...order, status: newStatus } : order
      ));
    } catch (error) {
      alert("Could not update order status.");
    }
  }, [token]);

  
  const getStatusColor = useCallback((status) => {
    switch (status) {
      case "Pending": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "Preparing": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "Delivered": return "bg-green-500/20 text-green-400 border-green-500/30";
      default: return "bg-white/10 text-gray-300 border-white/20";
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <div className="text-xl font-bold text-orange-500 animate-pulse tracking-widest">Loading Kitchen...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 p-4 sm:p-8 pt-28 relative overflow-hidden font-sans selection:bg-orange-500/30">
      
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white/5 backdrop-blur-md p-6 sm:p-8 rounded-[2rem] shadow-2xl border border-white/10"
        >
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Kitchen Dashboard</h1>
            <p className="text-gray-400 mt-2">Welcome back, <span className="font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">{user?.name || "Chef"}</span></p>
          </div>
          
          <div className="mt-6 sm:mt-0 flex gap-4 w-full sm:w-auto">
            <div className="bg-orange-500/10 px-6 py-4 rounded-2xl border border-orange-500/20 text-center flex items-center justify-center gap-3 w-full sm:w-auto shadow-[0_0_15px_rgba(249,115,22,0.1)]">
              <div>
                <p className="text-xs font-bold text-orange-400 uppercase tracking-wide mb-1">Active Orders</p>
                <p className="text-3xl font-black text-white leading-none">
                  {orders.filter(o => o.status !== 'Delivered').length}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="flex space-x-3 mb-8 bg-white/5 backdrop-blur-md p-2 rounded-2xl shadow-sm border border-white/10 w-fit">
          <button
            onClick={() => setActiveTab("orders")}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
              activeTab === "orders" 
                ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-[0_0_15px_rgba(249,115,22,0.4)]" 
                : "text-gray-400 hover:text-white hover:bg-white/10"
            }`}
          >
            <ReceiptLongIcon fontSize="small" /> Live Orders
          </button>
          
          <button
            onClick={() => setActiveTab("menu")}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
              activeTab === "menu" 
                ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-[0_0_15px_rgba(249,115,22,0.4)]" 
                : "text-gray-400 hover:text-white hover:bg-white/10"
            }`}
          >
            <VideoLibraryIcon fontSize="small" /> Manage Menu
          </button>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "orders" && (
            <motion.div 
              key="orders"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            >
              {orders.length === 0 ? (
                <div className="text-center py-24 bg-white/5 backdrop-blur-md rounded-[2rem] border border-white/10">
                  <LocalDiningIcon sx={{ fontSize: 80 }} className="text-white/20 mb-6" />
                  <h3 className="text-2xl font-bold text-white">No orders yet</h3>
                  <p className="text-gray-400 mt-2">When customers order your food, it will appear here.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 
                  {orders.map((order, index) => (
                    <OrderCard 
                      key={order._id}
                      order={order}
                      index={index}
                      getStatusColor={getStatusColor}
                      handleStatusChange={handleStatusChange}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {activeTab === "menu" && (
            <motion.div 
              key="menu"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="bg-white/5 backdrop-blur-md p-6 sm:p-8 rounded-[2rem] shadow-2xl border border-white/10">
                <h2 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-4">Upload New Dish</h2>
                <div className="max-w-xl mx-auto">
                  <UploadReelForm />
                </div>
              </div>
              
              <div className="bg-white/5 backdrop-blur-md p-6 sm:p-8 rounded-[2rem] shadow-2xl border border-white/10">
                <h2 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-4">Your Active Menu</h2>
                <MyReels /> 
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default Dashboard;