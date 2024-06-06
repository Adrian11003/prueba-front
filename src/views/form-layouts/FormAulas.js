'use client'

// ** React Imports
import { forwardRef, useState, useEffect } from 'react'
import { getAulas, createAulas } from "/api/aulas"
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

// ** Third Party Imports
import DatePicker from 'react-datepicker'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

const CustomInput = forwardRef((props, ref) => {
  return <TextField fullWidth {...props} inputRef={ref} label='Birth Date' autoComplete='off' />
})

const FormAddAula = () => {

  const [aulas, setAulas] = useState([]);
  const [seccionTipos, setSeccionTipos] = useState([]);

  const [formData, setFormData] = useState({
    numero_aula: '',
    capacidad: '',
    piso: '',
    seccion_id: '',
  });

  useEffect(() => {
    const fetchAulas = async () => {
      try {
        const data = await getAulas();
        setAulas(data);
      } catch (error) {
        console.error('Error al obtener las aulas:', error);
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


    fetchAulas();
    fetchSeccionTipos();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === 'capacidad' ? parseInt(value, 10) : name === 'capacidad' ? parseInt(value, 10) : value;
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await createAulas(formData);

      if (response) {
        Swal.fire({
          title: "Creación Exitosa!",
          text: "Aula creada exitosamente",
          icon: "success"
        }).then(() => {
          // Redireccionar al listado de alumnos
          window.location.href ="/Aulas";
        });
      }
    } catch (error) {
      console.error('Error al crear el aula:', error);

      // Aquí puedes mostrar un mensaje de error al usuario
    }
  };

  return (
    <Card>
      <CardHeader title='Registrar Aula' titleTypographyProps={{ variant: 'h6' }} />
      <Divider sx={{ margin: 0 }} />
      <form onSubmit={handleSubmit}>
        <CardContent>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Typography variant='body2' sx={{ fontWeight: 600 }}>
                Información
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth name='numero_aula' label='Número' placeholder='B402' value={formData.numero_aula} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label='Piso' placeholder='2' name="piso" value={formData.piso} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id='Docentes-layouts-separator-select-label'>Sección</InputLabel>
                <Select
                  label='Sección'
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
            <Grid item xs={12} sm={12}>
              <TextField fullWidth label='Capacidad' placeholder='9' name="capacidad" value={formData.capacidad} onChange={handleChange} required/>
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
          <Link href="/Aulas" passHref>
          <Button size='large' color='secondary' variant='outlined'>
          
            Cancelar
          </Button>
          </Link>
        </CardActions>
      </form>
    </Card>
  )
}

export default FormAddAula