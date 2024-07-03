'use client'

// ** React Imports
import { forwardRef, useState, useEffect } from 'react'
import { getSecciones, createSeccion } from "api/seccion"
import { getgrados } from 'api/grados';
import { getPeriodos } from 'api/periodos';
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
import { useRouter } from 'next/router'

const FormAddSeccion = () => {
  const router = useRouter();
  const { grado_id } = router.query;

  const [seccion, setSeccion] = useState([]);
  const [gradoTipos, setgradoTipos] = useState([]);
  const [periodoTipos, setperiodoTipos] = useState([]);

  const [formData, setFormData] = useState({
    nombre: '',
    aula: '',
    grado_id: grado_id ? parseInt(grado_id, 10) : '',
    periodo_id: ''
  });

  useEffect(() => {
    const fetchSeccion = async () => {
      try {
        const data = await getSecciones();
        setSeccion(data);
      } catch (error) {
        console.error('Error al obtener secciones');
      }
    };

    const fetchgradoTipos = async () => {
      try {
        const data = await getgrados();
        setgradoTipos(data);
      } catch (error) {
        console.error('Error al obtener los grados:', error);
      }
    };

    const fetchperiodoTipos = async () => {
      try {
        const data = await getPeriodos();
        setperiodoTipos(data);
      } catch (error) {
        console.error('Error al obtener los tipos de periodos:', error);
      }
    };

    fetchSeccion();
    fetchperiodoTipos();
    fetchgradoTipos();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === 'grado_id' || name === 'periodo_id' ? parseInt(value, 10) : value;
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await createSeccion(formData);

      if (response) {
        Swal.fire({
          title: "Creación Exitosa!",
          text: "Sección creada exitosamente",
          icon: "success"
        }).then(() => {
          window.location.href = "/Secciones";
        });
      }
    } catch (error) {
      console.error('Error al crear la sección:', error);
    }
  };

  return (
    <Card>
      <CardHeader title='Crear Sección' titleTypographyProps={{ variant: 'h6' }} />
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
              <TextField fullWidth label='Nombre' placeholder='A' name="nombre" value={formData.nombre} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label='Aula' placeholder='102' name="aula" value={formData.aula} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id='Docentes-layouts-separator-select-label'>Grado</InputLabel>
                <Select
                  label='Grado'
                  defaultValue={formData.grado_id}
                  id='form-layouts-separator-select'
                  labelId='form-layouts-separator-select-label'
                  name="grado_id" value={formData.grado_id} onChange={handleChange} required
                >
                  {gradoTipos.map((tipoGrado) => (
                    <MenuItem key={tipoGrado.grado_id} value={tipoGrado.grado_id}>
                      {tipoGrado.nombre}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id='Docentes-layouts-separator-select-label'>Periodo</InputLabel>
                <Select
                  label='Periodo'
                  defaultValue=''
                  id='form-layouts-separator-select'
                  labelId='form-layouts-separator-select-label'
                  name="periodo_id" value={formData.periodo_id} onChange={handleChange} required
                >
                  {periodoTipos.map((tipoPeriodo) => (
                    <MenuItem key={tipoPeriodo.periodo_id} value={tipoPeriodo.periodo_id}>
                      {tipoPeriodo.año}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
        <Divider sx={{ margin: 0 }} />
        <CardActions>
          <Button size='large' type='submit' sx={{ mr: 2 }} variant='contained'>
            Crear Sección
          </Button>
          <Link href="/Secciones" passHref>
            <Button size='large' color='secondary' variant='outlined'>
              Cancelar
            </Button>
          </Link>
        </CardActions>
      </form>
    </Card>
  );
};

export default FormAddSeccion;