import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

export const getServicios = () => api.get('/servicios');
export const getBarberos = () => api.get('/barberos');
export const getHorariosDisponibles = (fecha, barbero_id) =>
  api.get('/citas/disponibles', { params: { fecha, barbero_id } });
export const crearCita = (payload) => api.post('/citas', payload);