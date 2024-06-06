import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api-vn-dola.onrender.com'
})

export const getSeccion = async () => {
    try{
        const response = await api.get('https://api-vn-dola.onrender.com/seccion')
        
        return response.data;

    } catch (error) {
        console.error('Error al ver sección')
        throw error;
    }
}