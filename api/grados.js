import axios from 'axios';

const api = axios.create({
    baseURL: 'https://tp2024-2.onrender.com'
})

export const getgrados = async () => {
    try {
        const response = await api.get('https://tp2024-2.onrender.com/grado');
        
        return response.data;
    } catch (error) {
        console.error('Error al ver grados');
        throw error;
    }
};

export const creategrados = async (grados) => {
    try {
        const response = await api.post('https://tp2024-2.onrender.com/grado', grados)

        return response.data
    } catch (error) {
        console.error('Error al crear curso')
    }
}

export const getgradosById = async (grado_id) => {
    try {
        const response = await api.get(`https://tp2024-2.onrender.com/grado/${grado_id}`);

        return response.data;
    } catch (error) {
        console.error(`Error al obtener el curso con ID ${grado_id}`, error);
        throw error;
    }
}

export const updateGrado = async (grado_id, updatedgrados) => {
    try {
        const response = await api.put(`https://tp2024-2.onrender.com/grado/${grado_id}`, updatedgrados);

        return response.data;
    } catch (error) {
        console.error(`Error al actualizar el curso con ID ${grado_id}`, error);
        throw error;
    }
};

export const deletegrados = async (grado_id) => {
    const cursoId = Number(grado_id); // Convertir id a número

    console.log("id recibido: ",grado_id);
    
    if (isNaN(cursoId)) {
        throw new Error('ID inválido');
    }

    try {
        const response = await api.delete(`https://tp2024-2.onrender.com/grado/${grado_id}`);

        return response.data;
    } catch (error) {
        console.error(`Error al eliminar el aula con ID ${grado_id}`, error);
        throw error;
    }
};