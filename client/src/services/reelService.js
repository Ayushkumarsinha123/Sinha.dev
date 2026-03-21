import axios from "axios";
const API_URL = 'http://localhost:3000/api/reels';
// fetch reel for customer
export const fetchReels = async () => {
  const res = await axios.get(API_URL)
  return res.data;
}

// fetch restro own reels 

export const fetchMyReels= async(token) => {
  const response = await axios.get(`${API_URL}/my-reels`,{
    headers : {
      Authorization : `Bearer ${token}`
    }
  })
  return response.data;
}

// delete reel 

export const deleteReel = async (id , token) => {
  const response = await axios.delete(`${API_URL}/${id}`, {
    headers : {Authorization : `Bearer ${token}`}
  });
  return response.data;
};
// update reel
export const updateReel = async (id, updatedData, token) => {
  const response = await axios.put(`${API_URL}/${id}`,updatedData, {
    headers : {Authorization : `Bearer ${token}`}
  });
  return response.data;
}