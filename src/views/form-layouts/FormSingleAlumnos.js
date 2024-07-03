// ** React Imports
import { useState, useEffect } from 'react';
import { getEstudianteById, updateEstudiante } from "api/alumnos";
import { getDniTipos } from 'api/dni';
import { getApoderados } from 'api/apoderados';
import { getSecciones } from 'api/seccion';
import Swal from 'sweetalert2';
import Link from "next/link";
import { useRouter } from 'next/router';
import {
  Card,
  Grid,
  Button,
  Divider,
  MenuItem,
  TextField,
  CardHeader,
  InputLabel,
  Typography,
  CardContent,
  CardActions,
  FormControl,
  Select
} from '@mui/material';

const FormEditAlumno = () => {
  const router = useRouter();
  const { id } = router.query;

  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    direccion: '',
    numero_documento: '',
    documento_id: '',
    apoderado_id: '',
    seccion_id: '',
  });

  const [dniTipos, setDniTipos] = useState([]);
  const [apoderadoTipos, setApoderadoTipos] = useState([]);
  const [seccionTipos, setseccionTipos] = useState([]);

  useEffect(() => {
    const fetchAlumnos = async () => {
      try {
        const data = await getEstudianteById(id);
        setFormData({
          ...data,
          documento_id: data.documento.documento_id,
          apoderado_id: data.apoderado.apoderado_id,
          seccion_id: data.seccion.seccion_id
        });
      } catch (error) {
        console.error('Error al obtener el alumno:', error);
      }
    };

    if (id) {
      fetchAlumnos();
    }
  }, [id]);

  useEffect(() => {
    const fetchDniTipos = async () => {
      try {
        const data = await getDniTipos();
        setDniTipos(data);
      } catch (error) {
        console.error('Error al obtener los tipos de DNI:', error);
      }
    };

    const fetchApoderadoTipos = async () => {
      try {
        const data = await getApoderados();
        setApoderadoTipos(data);
      } catch (error) {
        console.error('Error al obtener los tipos de apoderados: ', error);
      }
    };

    const fetchseccionTipos = async () => {
      try {
        const data = await getSecciones();
        setseccionTipos(data);
      } catch (error) {
        console.error('Error al obtener los tipos de aulas: ', error);
      }
    };

    fetchDniTipos();
    fetchApoderadoTipos();
    fetchseccionTipos();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    const newValue = name === 'numero_documento' && value !== '' ? parseInt(value, 10) : value;

    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { nombre, apellido, direccion,  numero_documento, documento_id, apoderado_id, seccion_id } = formData;

      const formDataToUpdate = {
        nombre,
        apellido,
        direccion,
        numero_documento,
        documento_id,
        apoderado_id,
        seccion_id,
      };

      // Realiza la solicitud de actualización
      const response = await updateEstudiante(id, formDataToUpdate);

      if (response) {
        Swal.fire({
          title: "Actualización Exitosa!",
          text: "Alumno actualizado exitosamente",
          icon: "success"
        }).then(() => {
          // Redirecciona al listado de docentes
          router.push("/Alumnos");
        });
      }
    } catch (error) {
      console.error('Error al actualizar el alumno:', error.response ? error.response.data : error.message);

      // Muestra un mensaje de error al usuario
      Swal.fire({
        title: "Error!",
        text: "Hubo un error al actualizar el alumno. Por favor, inténtalo de nuevo.",
        icon: "error"
      });
    }
  };
  const currentYear = new Date().getFullYear().toString();
  const filteredSeccionTipos = seccionTipos.filter(seccion => seccion.periodo?.año === currentYear);

  return (
    <Card>
      <CardHeader title='Registrar Alumno' titleTypographyProps={{ variant: 'h6' }} />
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
              <TextField fullWidth name='nombre' label='Nombres' placeholder='Dereck' value={formData.nombre || ''} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label='Apellidos' placeholder='Muñoz' name="apellido" value={formData.apellido || ''} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id='Docentes-layouts-separator-select-label'>Tipo de Documento</InputLabel>
                <Select
                  label='Tipo de Documento'
                  defaultValue=''
                  id='form-layouts-separator-select'
                  labelId='form-layouts-separator-select-label'
                  name="documento_id" value={formData.documento_id || ''} onChange={handleChange} required
                >
                  {dniTipos.map((tipoDni) => (
                    <MenuItem key={tipoDni.documento_id} value={tipoDni.documento_id}>
                      {tipoDni.type}

                    </MenuItem>))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id='Docentes-layouts-separator-select-label'>Salón</InputLabel>
                <Select
                  label='Salon'
                  defaultValue=''
                  id='seccion-select'
                  labelId='seccion-label'
                  name='seccion_id' value={formData.seccion_id} onChange={handleChange} required
                >
                  {filteredSeccionTipos.map((tipoSeccion) => (
                    <MenuItem key={tipoSeccion.seccion_id} value={tipoSeccion.seccion_id}>
                      {`${tipoSeccion.nombre} - ${tipoSeccion.grado?.nombre || 'N/A'} - ${tipoSeccion.periodo?.año}`}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id='Docentes-layouts-separator-select-label'>Tipo de Apoderados</InputLabel>
                <Select
                  label='Tipo de Apoderado'
                  defaultValue=''
                  id='form-layouts-separator-select'
                  labelId='form-layouts-separator-select-label'
                  name="apoderado_id" value={formData.apoderado_id || ''} onChange={handleChange} required
                >
                  {apoderadoTipos.map((tipoApoderado) => (
                    <MenuItem key={tipoApoderado.apoderado_id} value={tipoApoderado.apoderado_id}>
                      {tipoApoderado.nombre}

                    </MenuItem>))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label='Nro. Doc.' placeholder='' name="numero_documento" value={formData.numero_documento || ''} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField fullWidth label='Dirección' placeholder='Jr Mariano Campos 996' name="direccion" value={formData.direccion || ''} onChange={handleChange} required />
            </Grid>
          </Grid>
        </CardContent>
        <Divider sx={{ margin: 0 }} />
        <CardActions>
          <Button size='large' type='submit' sx={{ mr: 2 }} variant='contained'>
            Actualizar
          </Button>
          <Link href="/Alumnos" passHref>
            <Button size='large' color='secondary' variant='outlined'>
              Cancelar
            </Button>
          </Link>
        </CardActions>
      </form>
    </Card>
  );
};

export default FormEditAlumno;