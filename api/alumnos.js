import axios from 'axios';

const api = axios.create({
    baseURL: 'https://tp2024-2.onrender.com'
})

export const getEstudiantes = async () => {
    try {
        const response = await api.get('https://tp2024-2.onrender.com/estudiante');
        
        return response.data;
    } catch (error) {
        console.error('Error al ver estudiante');
        throw error;
    }
};

export const createEstudiante = async (estudiante) => {
    try {
        const response = await api.post('https://tp2024-2.onrender.com/estudiante', estudiante)

        return response.data
    } catch (error) {
        console.error('Error al crear estudiante')
    }
}

export const getEstudianteById = async (estudiante_id) => {
    try {
        const response = await api.get(`https://tp2024-2.onrender.com/estudiante/${estudiante_id}`);

        return response.data;
    } catch (error) {
        console.error(`Error al obtener el alumno con ID ${estudiante_id}`, error);
        throw error;
    }
}

export const updateEstudiante = async (estudiante_id, updatedEstudiante) => {
    try {
        const response = await api.put(`https://tp2024-2.onrender.com/estudiante/${estudiante_id}`, updatedEstudiante);

        return response.data;
    } catch (error) {
        console.error(`Error al actualizar el alumno con ID ${estudiante_id}`, error);
        throw error;
    }
};

export const deleteEstudiante = async (estudiante_id) => {
    const estudianteId = Number(estudiante_id); // Convertir id a número

    console.log("id recibido: ", estudiante_id);

    if (isNaN(estudianteId)) {
        throw new Error('ID inválido');
    }

    try {
        const response = await api.delete(`https://tp2024-2.onrender.com/estudiante/${estudiante_id}`);

        return response.data;
    } catch (error) {
        console.error(`Error al eliminar el alumno con ID ${estudiante_id}`, error);
        throw error;
    }
};