import React, { useState, useEffect } from 'react';
import { fetchMyReels, deleteReel, updateReel } from '../../services/reelService'; 

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
      // Remove it from the screen without refreshing the page
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
      
      // Update the specific video in our state so the screen updates instantly
      setMyVideos(myVideos.map((video) => 
        video._id === id ? { ...video, title: updatedVideo.title, price: updatedVideo.price } : video
      ));
      
      setEditingId(null); // Turn off edit mode
    } catch (err) {
      alert("Failed to update reel");
    }
  };

  if (loading) return <div>Loading your menu items...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div className="my-reels-container">
      <h3>My Uploaded Menu</h3>
      
      {myVideos.length === 0 ? (
        <p>You haven't uploaded any dishes yet!</p>
      ) : (
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          {myVideos.map((reel) => (
            <div key={reel._id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px', width: '280px' }}>
              <video src={reel.videoUrl} controls width="250" style={{ borderRadius: '8px' }} />
              <h4 style={{ margin: '10px 0 5px 0' }}>{reel.dishName}</h4>

              {/* Toggle between Edit Mode and View Mode */}
              {editingId === reel._id ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
                  <input 
                    type="text" 
                    value={editForm.title} 
                    onChange={(e) => setEditForm({ ...editForm, title: e.target.value })} 
                    placeholder="Title"
                  />
                  <input 
                    type="number" 
                    value={editForm.price} 
                    onChange={(e) => setEditForm({ ...editForm, price: e.target.value })} 
                    placeholder="Price"
                  />
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button onClick={() => handleSaveEdit(reel._id)} style={{ background: 'green', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}>Save</button>
                    <button onClick={() => setEditingId(null)} style={{ background: 'gray', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}>Cancel</button>
                  </div>
                </div>
              ) : (
                <>
                  <p style={{ margin: '0', fontWeight: 'bold' }}>₹{reel.price}</p>
                  <p style={{ margin: '5px 0 15px 0', color: '#555' }}>{reel.title}</p>
                  
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button onClick={() => handleEditClick(reel)} style={{ background: '#007bff', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer', borderRadius: '4px' }}>Edit</button>
                    <button onClick={() => handleDelete(reel._id)} style={{ background: '#dc3545', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer', borderRadius: '4px' }}>Delete</button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyReels;