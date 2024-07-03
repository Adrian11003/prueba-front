'use client'

// ** React Imports
import { forwardRef, useState, useEffect } from 'react'
import { getEstudiantes, createEstudiante } from 'api/alumnos'
import { getDniTipos } from 'api/dni';
import { getApoderados } from 'api/apoderados';
import { getSecciones } from 'api/seccion';
import Swal from 'sweetalert2'
import Link from 'next/link'

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

// ** Icons Imports
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

const FormAddAlumnos = () => {
  const [estudiante, setAlumnos] = useState([]);
  const [documentoTipos, setdocumentoTipos] = useState([]);
  const [apoderadoTipos, setApoderadoTipos] = useState([]);
  const [seccionTipos, setseccionTipos] = useState([]);

  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    direccion: '',
    numero_documento: '',
    documento_id: '',
    apoderado_id: '',
    seccion_id: '',
  });

  useEffect(() => {
    const fetchAlumnos = async () => {
      try {
        const data = await getEstudiantes();
        setAlumnos(data);
      } catch (error) {
        console.error('Error al obtener los alumnos:', error);
      }
    };

    const fetchdocumentoTipos = async () => {
      try {
        const data = await getDniTipos();
        setdocumentoTipos(data);
      } catch (error) {
        console.error('Error al obtener los tipos de DNI:', error);
      }
    };

    const fetchApoderadoTipos = async () => {
      try {
        const data = await getApoderados();
        setApoderadoTipos(data);
      } catch (error) {
        console.error('Error al obtener los tipos de apoderados:', error);
      }
    };

    const fetchseccionTipos = async () => {
      try {
        const data = await getSecciones();
        setseccionTipos(data);
      } catch (error) {
        console.error('Error al obtener los tipos de aulas:', error);
      }
    };

    fetchAlumnos();
    fetchdocumentoTipos();
    fetchApoderadoTipos();
    fetchseccionTipos();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === 'numero_documento' ? String(value) : value; // Convertir a string si es necesario
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await createEstudiante(formData);

      if (response) {
        Swal.fire({
          title: 'Creación Exitosa!',
          text: 'Alumnos creado exitosamente',
          icon: 'success'
        }).then(() => {
          // Redireccionar al listado de alumnos
          window.location.href = '/Alumnos';
        });
      }
    } catch (error) {
      console.error('Error al crear el alumno:', error);

      // Aquí puedes mostrar un mensaje de error al usuario
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
              <TextField fullWidth name='nombre' label='Nombres' placeholder='Dereck' value={formData.nombre} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label='Apellidos' placeholder='Muñoz' name='apellido' value={formData.apellido} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id='documento-label'>Tipo de Documento</InputLabel>
                <Select
                  label='Tipo de Documento'
                  defaultValue=''
                  id='documento-select'
                  labelId='documento-label'
                  name='documento_id' value={formData.documento_id} onChange={handleChange} required
                >
                  {documentoTipos.map((tipoDocumento) => (
                    <MenuItem key={tipoDocumento.documento_id} value={tipoDocumento.documento_id}>
                      {tipoDocumento.type}
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
                <InputLabel id='apoderado-label'>Tipo de Apoderado</InputLabel>
                <Select
                  label='Tipo de Apoderado'
                  defaultValue=''
                  id='apoderado-select'
                  labelId='apoderado-label'
                  name='apoderado_id' value={formData.apoderado_id} onChange={handleChange} required
                >
                  {apoderadoTipos.map((tipoApoderado) => (
                    <MenuItem key={tipoApoderado.apoderado_id} value={tipoApoderado.apoderado_id}>
                      {`${tipoApoderado.nombre} ${tipoApoderado.apellido}`}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label='Nro. Doc.' name='numero_documento' value={formData.numero_documento} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label='Dirección' placeholder='Jr Mariano Campos 996' name='direccion' value={formData.direccion} onChange={handleChange} required />
            </Grid>
          </Grid>
        </CardContent>
        <Divider sx={{ margin: 0 }} />
        <CardActions>
          <Button size='large' type='submit' sx={{ mr: 2 }} variant='contained'>
            Registrar
          </Button>
          <Link href='/Alumnos' passHref>
            <Button size='large' color='secondary' variant='outlined'>
              Cancelar
            </Button>
          </Link>
        </CardActions>
      </form>
    </Card>
  );
};

export default FormAddAlumnos;
