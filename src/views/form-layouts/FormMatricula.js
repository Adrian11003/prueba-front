'use client'

// ** React Imports
import { forwardRef, useState, useEffect } from 'react'
import { getMatriculas, createMatriculas } from "api/matricula"
import { getAlumnos } from 'api/alumnos';
import { getApoderados } from 'api/apoderados';
import {  getSeccion } from 'api/seccion';
import Swal from 'sweetalert2'
import Link from "next/link"

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import Select from '@mui/material/Select'

const FormAddMatricula = () => {

    const [matriculas, setMatriculas] = useState([])
    const [alumnoTipos, setAlumnoTipos] = useState([])
    const [apoderadoTipos, setApoderadoTipos] = useState([]);
    const [seccionTipos, setSeccionTipos] = useState([])

    
  const [formData, setFormData] = useState({
    periodo_academico: '',
    numero_matricula: '',
    observaciones: '',
    alumno_id: '',
    apoderado_id: '',
    seccion_id: '',
  });

  useEffect(() => {
    const fetchMatriculas = async () => {
        try{
            const data = await getMatriculas();
            setMatriculas(data);
        } catch (error){
            console.error('Error al obtener matriculas')
        }
    };

    const fetchAlumnoTipos = async () => {
        try {
          const data = await getAlumnos();
          setAlumnoTipos(data);
        } catch (error) {
          console.error('Error al obtener los alumnos:', error);
        }
      };

    const fetchApoderadoTipos = async () => {
        try {
            const data = await getApoderados();
            setApoderadoTipos(data);
        }catch(error){
            console.error('Error al obtener los tipos de apoderados: ', error);
        }
    };

    const fetchSeccionTipos = async () => {
        try {
          const data = await getSeccion();
          setSeccionTipos(data);
        } catch (error) {
          console.error('Error al obtener las secciones:', error);
        }
      };

      fetchMatriculas();
      fetchApoderadoTipos();
      fetchAlumnoTipos();
      fetchSeccionTipos();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === 'a' ? parseInt(value, 10) : name === 'a' ? parseInt(value, 10) : value;
    setFormData({
        ...formData,
        [name]: newValue,
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await createMatriculas(formData);

      if (response) {
        Swal.fire({
          title: "Creación Exitosa!",
          text: "Matricula creada exitosamente",
          icon: "success"
        }).then(() => {
          // Redireccionar al listado de alumnos
          window.location.href ="/Matricula";
        });
      }
    } catch (error) {
      console.error('Error al crear la matricula:', error);

      // Aquí puedes mostrar un mensaje de error al usuario
    }
  };

  return (
    <Card>
      <CardHeader title='Matricula Alumno' titleTypographyProps={{ variant: 'h6' }} />
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
              <TextField fullWidth name='periodo_academico' label='Periodo Academico' placeholder='2024' value={formData.periodo_academico} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label='Numero Matricula' placeholder='0000001' name="numero_matricula" value={formData.numero_matricula} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label='Observaciones' placeholder='Ninguna' name="observaciones" value={formData.observaciones} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id='Docentes-layouts-separator-select-label'>Alumno</InputLabel>
                <Select
                  label='Alumno'
                  defaultValue=''
                  id='form-layouts-separator-select'
                  labelId='form-layouts-separator-select-label'
                  name="alumno_id" value={formData.alumno_id} onChange={handleChange} required
                >
                    {alumnoTipos.map((tipoAlumno) => (
                    <MenuItem key={tipoAlumno.alumno_id} value={tipoAlumno.alumno_id}>
                      {tipoAlumno.nombres_alumno}

                    </MenuItem>))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id='Docentes-layouts-separator-select-label'>Apoderado</InputLabel>
                <Select
                  label='Apoderado'
                  defaultValue=''
                  id='form-layouts-separator-select'
                  labelId='form-layouts-separator-select-label'
                  name="apoderado_id" value={formData.apoderado_id} onChange={handleChange} required
                >
                    {apoderadoTipos.map((tipoApoderado) => (
                    <MenuItem key={tipoApoderado.apoderado_id} value={tipoApoderado.apoderado_id}>
                      {tipoApoderado.nombres_apoderado}

                    </MenuItem>))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id='Docentes-layouts-separator-select-label'>Seccion</InputLabel>
                <Select
                  label='Tipo de Apoderado'
                  defaultValue=''
                  id='form-layouts-separator-select'
                  labelId='form-layouts-separator-select-label'
                  name="seccion_id" value={formData.seccion_id} onChange={handleChange} required
                >
                    {seccionTipos.map((tipoSeccion) => (
                    <MenuItem key={tipoSeccion.seccion_id} value={tipoSeccion.seccion_id}>
                      {tipoSeccion.nombre_seccion}

                    </MenuItem>))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
        <Divider sx={{ margin: 0 }} />
        <CardActions>
          <Button size='large' type='submit' sx={{ mr: 2 }} variant='contained'>
            Realizar Matricula
          </Button>
          <Link href="/Matricula" passHref>
          <Button size='large' color='secondary' variant='outlined'>
          
            Cancelar
          </Button>
          </Link>
        </CardActions>
      </form>
    </Card>
  )
}

export default FormAddMatricula

