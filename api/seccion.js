import axios from 'axios';

const api = axios.create({
    baseURL: 'https://tp2024-2.onrender.com'
})

export const getSecciones = async () => {
    try{
        const response = await api.get('https://tp2024-2.onrender.com/seccion')
        
        return response.data;

    } catch (error) {
        console.error('Error al ver sección')
        throw error;
    }};


export const createSeccion = async (seccion) => {
        try {
            const response = await api.post('https://tp2024-2.onrender.com/seccion', seccion)
    
            return response.data
        } catch (error) {
            console.error('Error al crear curso')
        }
    }
    
    export const getSeccionById = async (seccion_id) => {
        try {
            const response = await api.get(`https://tp2024-2.onrender.com/seccion/${seccion_id}`);
    
            return response.data;
        } catch (error) {
            console.error(`Error al obtener el curso con ID ${seccion_id}`, error);
            throw error;
        }
    }
    
    export const updateSeccion = async (seccion_id, updatedseccion) => {
        try {
            const response = await api.put(`https://tp2024-2.onrender.com/seccion/${seccion_id}`, updatedseccion);
    
            return response.data;
        } catch (error) {
            console.error(`Error al actualizar el curso con ID ${seccion_id}`, error);
            throw error;
        }
    };
    
    export const deleteSeccion = async (seccion_id) => {
        const seccionId = Number(seccion_id); // Convertir id a número
    
        console.log("id recibido: ",seccion_id);
        
        if (isNaN(seccionId)) {
            throw new Error('ID inválido');
        }
    
        try {
            const response = await api.delete(`https://tp2024-2.onrender.com/seccion/${seccion_id}`);
    
            return response.data;
        } catch (error) {
            console.error(`Error al eliminar el aula con ID ${seccion_id}`, error);
            throw error;
        }
    };
