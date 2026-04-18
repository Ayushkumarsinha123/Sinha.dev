import API from "../utils/api";


export const fetchCart = async (token) => {
  const response = await API.get('/shop/cart', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const syncCart = async (items, token) => {
  const response = await API.put('/shop/cart', { items }, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

// order services
export const createOrder = async (orderData, token) => {
  const response = await API.post('/shop/order', orderData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

// restro services
export const fetchRestaurantOrders = async (token) => {
  const response = await API.get('/shop/orders/restaurant', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const updateOrderStatus = async (orderId, status, token) => {
  const response = await API.put(`/shop/orders/${orderId}/status`, { status }, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};