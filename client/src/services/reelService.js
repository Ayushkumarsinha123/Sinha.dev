
import API from "../utils/api";

// fetch reel for customer
export const fetchReels = async () => {
  const res = await API.get(`/reels`);
  return res.data;
};

// fetch restro own reels 
export const fetchMyReels = async(token) => {
  const response = await API.get(`/reels/my-reels`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

// delete reel 
export const deleteReel = async (id, token) => {
  const response = await API.delete(`/reels/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

// update reel
export const updateReel = async (id, updatedData, token) => {
  const response = await API.put(`/reels/${id}`, updatedData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

// search reel
export const fetchSearchResults = async (searchTerm) => {
  const response = await API.get(`/reels/search?query=${searchTerm}`);
  return response.data;
};