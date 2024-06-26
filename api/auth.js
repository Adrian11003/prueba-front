import axios from 'axios';

const API_URL = 'https://api-vn-dola.onrender.com/auth'; // Asegúrate de que la URL coincide con tu configuración de backend

export const login = async (email_usuario, contrasena_usuario) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email_usuario,
      contrasena_usuario,
    });
    return response.data;
  } catch (error) {
    console.error('Error logging in', error);
    throw error;
  }
};

export const register = async (nombres_usuario, email_usuario, contrasena_usuario) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      nombres_usuario,
      email_usuario,
      contrasena_usuario,
    });
    return response.data;
  } catch (error) {
    console.error('Error registering', error);
    throw error;
  }
};
