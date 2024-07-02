import axios from 'axios';

const api = axios.create({
    baseURL: 'https://tp2024-2.onrender.com'
})

export const getDocentes = async () => {
    try{
        const response = await api.get('https://tp2024-2.onrender.com/docente');
        
        return response.data;
    } catch (error) {
        console.error('Error al ver apoderados');
        throw error;
    }
};

export const createDocentes = async (docentes) => {
    try{
        const response = await api.post('https://tp2024-2.onrender.com/docente', docentes)

        return response.data
    } catch (error) {
        console.error('Error al crear apoderados')
    }
}

export const getDocentesById = async (docente_id) => {
    try {
        const response = await api.get(`https://tp2024-2.onrender.com/docente/${docente_id}`);

        return response.data;
    } catch (error) {
        console.error(`Error al obtener el apoderado con ID ${docente_id}`, error);
        throw error;
    }
}

export const updateDocentes = async (docente_id, updatedDocentes) => {
    try {
        const response = await api.put(`https://tp2024-2.onrender.com/docente/${docente_id}`, updatedDocentes);

        return response.data;
    } catch (error) {
        console.error(`Error al actualizar el apoderado con ID ${docente_id}`, error);
        throw error;
    }
};

export const deleteDocentes = async (docente_id) => {
    const alumnoId = Number(docente_id); // Convertir id a número

    console.log("id recibido: ",docente_id);
    
    if (isNaN(alumnoId)) {
        throw new Error('ID inválido');
    }

    try {
        const response = await api.delete(`https://tp2024-2.onrender.com/docente/${docente_id}`);

        return response.data;
    } catch (error) {
        console.error(`Error al eliminar el apoderado con ID ${docente_id}`, error);
        throw error;
    }
};