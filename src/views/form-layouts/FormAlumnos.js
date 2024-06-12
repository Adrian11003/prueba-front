'use client'

// ** React Imports
import { forwardRef, useState, useEffect } from 'react'
import { getAlumnos, createAlumnos } from "/api/alumnos"
import { getDniTipos } from 'api/dni';
import { getApoderados } from 'api/apoderados';
import { getAulas } from 'api/aulas';
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

const FormAddAlumnos = () => {

  const [alumnos, setAlumnos] = useState([]);
  const [dniTipos, setDniTipos] = useState([]);
  const [apoderadoTipos, setApoderadoTipos] = useState([]);
  const [aulasTipos, setAulasTipos] = useState([])

  const [formData, setFormData] = useState({
    nombres_alumno: '',
    apellidos_alumno: '',
    direccion_alumno: '',
    telefono_alumno: '',
    numero_dni: '',
    dni_id: '',
    apoderado_id: '',
    aulas_id: '',
  });

  useEffect(() => {
    const fetchAlumnos = async () => {
      try {
        const data = await getAlumnos();
        setAlumnos(data);
      } catch (error) {
        console.error('Error al obtener los alumnos:', error);
      }
    };

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
        }catch(error){
            console.error('Error al obtener los tipos de apoderados: ', error);
        }
    }

    const fetchAulasTipos = async () => {
        try{
            const data = await getAulas();
            setAulasTipos(data);
        }catch(error){
            console.error('Error al obtener los tipos de aulas: ', error);
        }
    }

    fetchAlumnos();
    fetchDniTipos();
    fetchApoderadoTipos();
    fetchAulasTipos();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === 'numero_dni' ? parseInt(value, 10) : name === 'dni_id' ? parseInt(value, 10) : value;
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await createAlumnos(formData);

      if (response) {
        Swal.fire({
          title: "Creación Exitosa!",
          text: "Alumnos creado exitosamente",
          icon: "success"
        }).then(() => {
          // Redireccionar al listado de alumnos
          window.location.href ="/Alumnos";
        });
      }
    } catch (error) {
      console.error('Error al crear el alumno:', error);

      // Aquí puedes mostrar un mensaje de error al usuario
    }
  };

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
              <TextField fullWidth name='nombres_alumno' label='Nombres' placeholder='Dereck' value={formData.nombres_alumno} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label='Apellidos' placeholder='Muñoz' name="apellidos_alumno" value={formData.apellidos_alumno} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id='Docentes-layouts-separator-select-label'>Tipo de Documento</InputLabel>
                <Select
                  label='Tipo de Documento'
                  defaultValue=''
                  id='form-layouts-separator-select'
                  labelId='form-layouts-separator-select-label'
                  name="dni_id" value={formData.dni_id} onChange={handleChange} required
                >
                    {dniTipos.map((tipoDni) => (
                    <MenuItem key={tipoDni.dni_id} value={tipoDni.dni_id}>
                      {tipoDni.tipo_dni}

                    </MenuItem>))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id='Docentes-layouts-separator-select-label'>Tipo de Aulas</InputLabel>
                <Select
                  label='Tipo de Aula'
                  defaultValue=''
                  id='form-layouts-separator-select'
                  labelId='form-layouts-separator-select-label'
                  name="aulas_id" value={formData.aulas_id} onChange={handleChange} required
                >
                    {aulasTipos.map((tipoAula) => (
                    <MenuItem key={tipoAula.aulas_id} value={tipoAula.aulas_id}>
                      {tipoAula.grado}

                    </MenuItem>))}
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
              <TextField fullWidth label='Nro. Doc.' placeholder=''  name="numero_dni" value={formData.numero_dni} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label='Nro. Telef.' placeholder='+51 123456879' name="telefono_alumno" value={formData.telefono_alumno} onChange={handleChange}  required />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField fullWidth label='Dirección' placeholder='Jr Mariano Campos 996' name="direccion_alumno" value={formData.direccion_alumno} onChange={handleChange} required/>
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
          <Link href="/Alumnos" passHref>
          <Button size='large' color='secondary' variant='outlined'>
          
            Cancelar
          </Button>
          </Link>
        </CardActions>
      </form>
    </Card>
  )
}

export default FormAddAlumnos