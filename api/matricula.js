import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api-vn-dola.onrender.com'
})

export const getMatriculas = async () => {
    try{
        const response = await api.get('https://api-vn-dola.onrender.com/matricula');

        return response.data;
        
    } catch (error){
        console.error('Error al ver matriculas')
    }
}

export const createMatriculas = async (matricula) => {
    try{
        const response = await api.post('https://api-vn-dola.onrender.com/matricula', matricula)

        return response.data
    } catch (error){
        console.error('Error al crear matriculas')
    }
}

export const getMatriculaById = async (matricula_id) => {
    try {
        const response = await api.get(`https://api-vn-dola.onrender.com/matricula/${matricula_id}`);

        return response.data;
    } catch (error) {
        console.error(`Error al obtener la matricula con ID ${matricula_id}`, error);
        throw error;
    }
}

export const updateMatricula = async (matricula_id, updatedMatricula) => {
    try {
        const response = await api.put(`https://api-vn-dola.onrender.com/matricula/${matricula_id}`, updatedMatricula);

        return response.data;
    } catch (error) {
        console.error(`Error al actualizar la matricula con ID ${matricula_id}`, error);
        throw error;
    }
};

export const deleteMatricula = async (matricula_id) => {
    const matriculaId = Number(matricula_id); // Convertir id a número

    console.log("id recibido: ", matricula_id);

    if (isNaN(matriculaId)) {
        throw new Error('ID inválido');
    }

    try {
        const response = await api.delete(`https://api-vn-dola.onrender.com/matricula/${matricula_id}`);

        return response.data;
    } catch (error) {
        console.error(`Error al eliminar la matricula con ID ${matricula_id}`, error);
        throw error;
    }
};