import React, { useState, useEffect } from 'react';
import { fetchMyReels, deleteReel, updateReel } from '../../services/reelService'; 
import { motion } from "framer-motion";

import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";

const MyReels = () => {
  const [myVideos, setMyVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // State for Editing
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ title: '', price: '' });

  const token = localStorage.getItem("token");

  useEffect(() => {
    const loadMyVideos = async () => {
      try {
        const data = await fetchMyReels(token);
        setMyVideos(data);
        setLoading(false);
      } catch (err) {
        setError("Could not load your reels.");
        setLoading(false);
      }
    };
    loadMyVideos();
  }, [token]);

  // Handle Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this menu item?")) return;
    try {
      await deleteReel(id, token);
      setMyVideos(myVideos.filter((video) => video._id !== id));
    } catch (err) {
      alert("Failed to delete reel");
    }
  };

  // Handle Edit Click (Turns on Edit Mode)
  const handleEditClick = (reel) => {
    setEditingId(reel._id);
    setEditForm({ title: reel.title, price: reel.price });
  };

  // Handle Save (Submits the update)
  const handleSaveEdit = async (id) => {
    try {
      const updatedVideo = await updateReel(id, editForm, token);
      
      setMyVideos(myVideos.map((video) => 
        video._id === id ? { ...video, title: updatedVideo.title, price: updatedVideo.price } : video
      ));
      
      setEditingId(null); 
    } catch (err) {
      alert("Failed to update reel");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="text-orange-500 font-bold animate-pulse tracking-widest">Loading your menu...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-center font-bold">
        {error}
      </div>
    );
  }

  return (
    <div className="w-full">
      {myVideos.length === 0 ? (
        <div className="text-center py-16 bg-white/5 rounded-3xl border border-white/10">
          <p className="text-gray-400 text-lg">You haven't uploaded any dishes yet!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {myVideos.map((reel, index) => (
            <motion.div 
              key={reel._id} 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: Math.min(index * 0.05, 0.5) }}
              className="bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 overflow-hidden flex flex-col hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] transition-all"
            >
              {/* Video Thumbnail */}
              <div className="relative w-full h-56 bg-black">
                <video 
                  src={reel.videoUrl} 
                  className="w-full h-full object-cover opacity-80"
                  controlsList="nodownload"
                />
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col">
                <h4 className="text-xl font-extrabold text-white mb-1 truncate">{reel.dishName}</h4>
                
                {/* EDIT MODE */}
                {editingId === reel._id ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col gap-3 mt-3 flex-1"
                  >
                    <input 
                      type="text" 
                      value={editForm.title} 
                      onChange={(e) => setEditForm({ ...editForm, title: e.target.value })} 
                      placeholder="Catchy Title"
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all text-sm"
                    />
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">₹</span>
                      <input 
                        type="number" 
                        value={editForm.price} 
                        onChange={(e) => setEditForm({ ...editForm, price: e.target.value })} 
                        placeholder="Price"
                        className="w-full bg-black/40 border border-white/10 rounded-xl pl-8 pr-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all text-sm"
                      />
                    </div>
                    
                    <div className="flex gap-2 mt-auto pt-3">
                      <button 
                        onClick={() => handleSaveEdit(reel._id)} 
                        className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-2.5 rounded-xl flex items-center justify-center gap-1 hover:scale-[1.02] transition-transform text-sm"
                      >
                        <SaveIcon fontSize="small" /> Save
                      </button>
                      <button 
                        onClick={() => setEditingId(null)} 
                        className="flex-1 bg-white/10 text-gray-300 hover:text-white hover:bg-white/20 font-bold py-2.5 rounded-xl flex items-center justify-center gap-1 transition-colors text-sm"
                      >
                        <CloseIcon fontSize="small" /> Cancel
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  /* VIEW MODE */
                  <div className="flex flex-col flex-1">
                    <p className="text-orange-400 font-black text-lg mb-1">₹{reel.price}</p>
                    <p className="text-gray-400 text-sm mb-5 line-clamp-2 leading-relaxed">{reel.title}</p>
                    
                    <div className="flex gap-2 mt-auto pt-4 border-t border-white/10">
                      <button 
                        onClick={() => handleEditClick(reel)} 
                        className="flex-1 bg-white/10 hover:bg-white/20 text-white font-bold py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition-colors text-sm"
                      >
                        <EditIcon fontSize="small" /> Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(reel._id)} 
                        className="flex-1 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-500 font-bold py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition-colors text-sm"
                      >
                        <DeleteOutlineIcon fontSize="small" /> Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyReels;