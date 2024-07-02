import axios from 'axios';

const api = axios.create({
    baseURL: 'https://tp2024-2.onrender.com'
})

export const getApoderados = async () => {
    try{
        const response = await api.get('https://tp2024-2.onrender.com/apoderado');
        
        return response.data;
    } catch (error) {
        console.error('Error al ver apoderados');
        throw error;
    }
};

export const createApoderados = async (apoderados) => {
    try{
        const response = await api.post('https://tp2024-2.onrender.com/apoderado', apoderados)

        return response.data
    } catch (error) {
        console.error('Error al crear apoderados')
    }
}

export const getApoderadoById = async (apoderado_id) => {
    try {
        const response = await api.get(`https://tp2024-2.onrender.com/apoderado/${apoderado_id}`);

        return response.data;
    } catch (error) {
        console.error(`Error al obtener el apoderado con ID ${apoderado_id}`, error);
        throw error;
    }
}

export const updateApoderado = async (apoderado_id, updatedApoderado) => {
    try {
        const response = await api.put(`https://tp2024-2.onrender.com/apoderado/${apoderado_id}`, updatedApoderado);

        return response.data;
    } catch (error) {
        console.error(`Error al actualizar el apoderado con ID ${apoderado_id}`, error);
        throw error;
    }
};

export const deleteApoderado = async (apoderado_id) => {
    const alumnoId = Number(apoderado_id); // Convertir id a número

    console.log("id recibido: ",apoderado_id);
    
    if (isNaN(alumnoId)) {
        throw new Error('ID inválido');
    }

    try {
        const response = await api.delete(`https://tp2024-2.onrender.com/apoderado/${apoderado_id}`);

        return response.data;
    } catch (error) {
        console.error(`Error al eliminar el apoderado con ID ${apoderado_id}`, error);
        throw error;
    }
};