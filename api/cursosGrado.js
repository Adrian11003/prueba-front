import axios from 'axios';

const api = axios.create({
    baseURL: 'https://tp2024-2.onrender.com'
})

export const getCursosGrado = async () => {
    try{
        const response = await api.get('https://tp2024-2.onrender.com/grado-cursos')
        
        return response.data;

    } catch (error) {
        console.error('Error al ver sección')
        throw error;
    }};


export const createCursosGrado = async (gradoc) => {
        try {
            const response = await api.post('https://tp2024-2.onrender.com/grado-cursos', gradoc)
    
            return response.data
        } catch (error) {
            console.error('Error al crear curso')
        }
    }
    
    export const getCursosGradoById = async (gradoc_id) => {
        try {
            const response = await api.get(`https://tp2024-2.onrender.com/grado-cursos/${gradoc_id}`);
    
            return response.data;
        } catch (error) {
            console.error(`Error al obtener el curso con ID ${gradoc_id}`, error);
            throw error;
        }
    }
    
    export const updateCursosGradoById = async (gradoc_id, updatedGradoCursos) => {
        try {
            const response = await api.put(`https://tp2024-2.onrender.com/grado-cursos/${gradoc_id}`, updatedGradoCursos);
    
            return response.data;
        } catch (error) {
            console.error(`Error al actualizar el curso con ID ${gradoc_id}`, error);
            throw error;
        }
    };
    
    export const deleteCursosGrado = async (gradoc_id) => {
        const gradocId = Number(gradoc_id); // Convertir id a número
    
        console.log("id recibido: ",gradoc_id);
        
        if (isNaN(gradocId)) {
            throw new Error('ID inválido');
        }
    
        try {
            const response = await api.delete(`https://tp2024-2.onrender.com/grado-cursos/${gradoc_id}`);
    
            return response.data;
        } catch (error) {
            console.error(`Error al eliminar el aula con ID ${gradoc_id}`, error);
            throw error;
        }
    };