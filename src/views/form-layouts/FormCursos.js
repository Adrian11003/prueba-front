'use client'

// ** React Imports
import { forwardRef, useState, useEffect } from 'react'
import { getCursos, createCursos } from "/api/cursos"
import { getAulas } from 'api/aulas';
import { getDocentes } from 'api/docentes';

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

import Select from '@mui/material/Select'


const FormAddCurso = () => {

  const [cursos, setCursos] = useState([]);


  const [formData, setFormData] = useState({
    nombre: '',
  });

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const data = await getCursos();
        setCursos(data);
      } catch (error) {
        console.error('Error al obtener los cursos:', error);
      }
    };





    fetchCursos();
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
      const response = await createCursos(formData);

      if (response) {
        Swal.fire({
          title: "Creación Exitosa!",
          text: "Curso creado exitosamente",
          icon: "success"
        }).then(() => {
          // Redireccionar al listado de alumnos
          window.location.href = "/Cursos";
        });
      }
    } catch (error) {
      console.error('Error al crear el curso:', error);

      // Aquí puedes mostrar un mensaje de error al usuario
    }
  };

  return (
    <Card>
      <CardHeader title='Registrar Curso' titleTypographyProps={{ variant: 'h6' }} />
      <Divider sx={{ margin: 0 }} />
      <form onSubmit={handleSubmit}>
        <CardContent>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Typography variant='body2' sx={{ fontWeight: 600 }}>
                Información
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField fullWidth name='nombre' label='Nombre' placeholder='Comunicación' value={formData.nombre} onChange={handleChange} required />
            </Grid>
            
            {/* <Grid item xs={12} sm={6}>
              <DatePicker
                selected={date}
                showYearDropdown
                showMonthDropdown
                placeholderText='MM-DD-YYYY'
                customInput={<CustomInput />}
                id='form-layouts-separator-date'
                onChange={date => setDate(date)}
              />
            </Grid> */}

          </Grid>
        </CardContent>
        <Divider sx={{ margin: 0 }} />
        <CardActions>
          <Button size='large' type='submit' sx={{ mr: 2 }} variant='contained'>
            Registrar
          </Button>
          <Link href="/Cursos" passHref>
            <Button size='large' color='secondary' variant='outlined'>

              Cancelar
            </Button>
          </Link>
        </CardActions>
      </form>
    </Card>
  )
}

export default FormAddCurso