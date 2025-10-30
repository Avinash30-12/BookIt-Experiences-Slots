import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Experience APIs
export const experienceAPI = {
  getAll: () => api.get('/experiences'),
  getById: (id) => api.get(`/experiences/${id}`),
};

// Booking APIs
export const bookingAPI = {
  create: (bookingData) => api.post('/bookings', bookingData),
  getByReference: (reference) => api.get(`/bookings/${reference}`),
};

// Promo APIs
export const promoAPI = {
  validate: (code, amount) => api.post('/promo/validate', { code, amount }),
};

export default api;