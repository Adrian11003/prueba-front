'use client'

// ** React Imports
import { forwardRef, useState, useEffect } from 'react'
import { getMatriculaById, updateMatricula } from 'api/matricula';
import { getDniTipos } from 'api/dni';
import Swal from 'sweetalert2'
import Link from "next/link"
import Router from 'next/dist/server/router';
import { useRouter } from 'next/router';
import { getEstudiantes } from 'api/alumnos';
import { getSecciones } from 'api/seccion';

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import FormControl from '@mui/material/FormControl'

import Select from '@mui/material/Select'


// const CustomInput = forwardRef((props, ref) => {
//   return <TextField fullWidth {...props} inputRef={ref} label='Birth Date' autoComplete='off' />
// })

const FormEditApoderado = () => {
  const router = useRouter();
  const { id } = router.query;

  const [formData, setFormData] = useState({
    estado: '',
    estudiante_id: '',
    seccion_id: '',
  });
  const [selectedEstudiante, setSelectedEstudiante] = useState(null);
  const [selectedSeccion, setSelectedSeccion] = useState(null);

  const [matriculas, setMatriculas] = useState([]);
  const [estudianteTipos, setEstudianteTipos] = useState([]);
  const [seccionTipos, setSeccionTipos] = useState([]);

  useEffect(() => {
    const fetchApoderado = async () => {
      try {
        const data = await getMatriculaById(id);
        setFormData({
          ...data,
          estudiante_id: data.estudiante.estudiante_id,
          seccion_id: data.seccion.seccion_id
        });
      } catch (error) {
        console.error('Error al obtener la matricula:', error);
      }
    };

    if (id) {
      fetchApoderado();
    }
  }, [id]);

  useEffect(() => {
    const fetchDniTipos = async () => {
      try {
        const data = await getSecciones();
        setSeccionTipos(data);
      } catch (error) {
        console.error('Error al obtener los tipos de DNI:', error);
      }
    };

    fetchDniTipos();
  }, []);
  useEffect(() => {
    const fetchEstudianteTipos = async () => {
      try {
        const data = await getEstudiantes();
        setEstudianteTipos(data);
      } catch (error) {
        console.error('Error al obtener los tipos de DNI:', error);
      }
    };

    fetchEstudianteTipos();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    const newValue = name === 'numero_dni' && value !== '' ? parseInt(value, 10) : value;

    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const { estado, estudiante_id, seccion_id } = formData;
  
      const formDataToUpdate = {
        estado,
    estudiante_id,
    seccion_id,
      };
  
      // Realiza la solicitud de actualización
      const response = await updateMatricula(id, formDataToUpdate);
  
      if (response) {
        Swal.fire({
          title: "Actualización Exitosa!",
          text: "Apoderado actualizado exitosamente",
          icon: "success"
        }).then(() => {
          // Redirecciona al listado de docentes
          router.push("/Matricula");
        });
      }
    } catch (error) {
      console.error('Error al actualizar el apoderado:', error.response ? error.response.data : error.message);

      // Muestra un mensaje de error al usuario
      Swal.fire({
        title: "Error!",
        text: "Hubo un error al actualizar el apoderado. Por favor, inténtalo de nuevo.",
        icon: "error"
      });
    }
  };

  const handleChangeEstudiante = (e) => {
    const estudianteId = e.target.value;
    setSelectedEstudiante(estudianteTipos.find(estudiante => estudiante.estudiante_id === estudianteId));
    setFormData({
      ...formData,
      estudiante_id: estudianteId,
    });
  };

  const handleChangeSeccion = (e) => {
    const seccionId = e.target.value;
    setSelectedSeccion(seccionTipos.find(seccion => seccion.seccion_id === seccionId));
    setFormData({
      ...formData,
      seccion_id: seccionId,
    });
  };
  
  return (
    <Card>
      <CardHeader title='Modificar Apoderado' titleTypographyProps={{ variant: 'h6' }} />
      <Divider sx={{ margin: 0 }} />
      <form onSubmit={handleSubmit}>
        <CardContent>
        <Grid container spacing={5}>
            <Grid item xs={12}>
              <Typography variant='body2' sx={{ fontWeight: 600 }}>
                Información Personal
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id='estado-label'>Estado</InputLabel>
                <Select
                  label='Estado'
                  defaultValue='Pendiente'
                  id='estado-select'
                  labelId='estado-label'
                  name='estado'
                  value={formData.estado}
                  onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
                  required
                >
                  <MenuItem value='Pendiente'>Pendiente</MenuItem>
                  <MenuItem value='Pagado'>Pagado</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id='apoderado-label'>Tipo de Alumno</InputLabel>
                <Select
                  label='Tipo de Alumno'
                  defaultValue=''
                  id='apoderado-select'
                  labelId='apoderado-label'
                  name='estudiante_id'
                  value={formData.estudiante_id}
                  onChange={handleChangeEstudiante}
                  required
                >
                  {estudianteTipos.map((tipoEstudiante) => (
                    <MenuItem key={tipoEstudiante.estudiante_id} value={tipoEstudiante.estudiante_id}>
                      {`${tipoEstudiante.nombre} ${tipoEstudiante.apellido}`}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id='seccion-label'>Salón</InputLabel>
                <Select
                  label='Salon'
                  defaultValue=''
                  id='seccion-select'
                  labelId='seccion-label'
                  name='seccion_id'
                  value={formData.seccion_id}
                  onChange={handleChangeSeccion}
                  required
                >
                  {selectedEstudiante && selectedEstudiante.seccion && (
                    <MenuItem key={selectedEstudiante.seccion.seccion_id} value={selectedEstudiante.seccion.seccion_id}>
                      {`${selectedEstudiante.seccion.nombre} - ${selectedEstudiante.seccion.grado?.nombre || 'N/A'} - ${selectedEstudiante.seccion.periodo?.año}`}
                    </MenuItem>
                  )}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
        <Divider sx={{ margin: 0 }} />
        <CardActions>
          <Button size='large' type='submit' sx={{ mr: 2 }} variant='contained'>
            Actualizar
          </Button>
          <Button size='large' color='secondary' variant='outlined' onClick={() => router.back()}>
            Cancelar
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

export default FormEditApoderado
