import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api-vn-dola.onrender.com'
})

export const getCursos = async () => {
    try {
        const response = await api.get('https://api-vn-dola.onrender.com/cursos');
        
        return response.data;
    } catch (error) {
        console.error('Error al ver cursos');
        throw error;
    }
};

export const createCursos = async (cursos) => {
    try {
        const response = await api.post('https://api-vn-dola.onrender.com/cursos', cursos)

        return response.data
    } catch (error) {
        console.error('Error al crear curso')
    }
}

export const getCursosById = async (cursos_id) => {
    try {
        const response = await api.get(`https://api-vn-dola.onrender.com/cursos/${cursos_id}`);

        return response.data;
    } catch (error) {
        console.error(`Error al obtener el curso con ID ${cursos_id}`, error);
        throw error;
    }
}

export const updateCurso = async (cursos_id, updatedCursos) => {
    try {
        const response = await api.put(`https://api-vn-dola.onrender.com/cursos/${cursos_id}`, updatedCursos);

        return response.data;
    } catch (error) {
        console.error(`Error al actualizar el curso con ID ${cursos_id}`, error);
        throw error;
    }
};

export const deleteCursos = async (cursos_id) => {
    const cursoId = Number(cursos_id); // Convertir id a número

    console.log("id recibido: ",cursos_id);
    
    if (isNaN(cursoId)) {
        throw new Error('ID inválido');
    }

    try {
        const response = await api.delete(`https://api-vn-dola.onrender.com/cursos/${cursos_id}`);

        return response.data;
    } catch (error) {
        console.error(`Error al eliminar el aula con ID ${cursos_id}`, error);
        throw error;
    }
};