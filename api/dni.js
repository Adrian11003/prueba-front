import axios from 'axios';

const api = axios.create({
    baseURL: 'https://tp2024-2.onrender.com'
})

export const getDniTipos = async () => {
    try{
        const response = await api.get('https://tp2024-2.onrender.com/documento')
        
        return response.data;

    } catch (error) {
        console.error('Error al ver dni')
        throw error;
    }
}