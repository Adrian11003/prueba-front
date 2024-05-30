import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api-vn-dola.onrender.com'
})

export const getAulas = async () => {
    try {
        const response = await api.get('https://api-vn-dola.onrender.com/aulas');
        
        return response.data;
    } catch (error) {
        console.error('Error al ver aulas');
        throw error;
    }
};