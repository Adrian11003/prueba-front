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

export const createAulas = async (aulas) => {
    try {
        const response = await api.post('https://api-vn-dola.onrender.com/aulas', aulas)

        return response.data
    } catch (error) {
        console.error('Error al crear aulas')
    }
}

export const getAulaById = async (aulas_id) => {
    try {
        const response = await api.get(`https://api-vn-dola.onrender.com/aulas/${aulas_id}`);

        return response.data;
    } catch (error) {
        console.error(`Error al obtener el aula con ID ${aulas_id}`, error);
        throw error;
    }
}

export const updateAlumno = async (aulas_id, updatedAulas) => {
    try {
        const response = await api.put(`https://api-vn-dola.onrender.com/aulas/${aulas_id}`, updatedAulas);

        return response.data;
    } catch (error) {
        console.error(`Error al actualizar el aula con ID ${aulas_id}`, error);
        throw error;
    }
};

export const deleteAulas = async (aulas_id) => {
    const aulaId = Number(aulas_id); // Convertir id a número

    console.log("id recibido: ",aulas_id);
    
    if (isNaN(aulaId)) {
        throw new Error('ID inválido');
    }

    try {
        const response = await api.delete(`https://api-vn-dola.onrender.com/aulas/${aulas_id}`);

        return response.data;
    } catch (error) {
        console.error(`Error al eliminar el aula con ID ${aulas_id}`, error);
        throw error;
    }
};