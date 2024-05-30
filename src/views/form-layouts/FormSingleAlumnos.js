'use client'

// ** React Imports
import { forwardRef, useState, useEffect } from 'react'
import { getAlumnoById, updateAlumno } from "/api/alumnos"
import { getDniTipos } from 'api/dni';
import { getApoderados } from 'api/apoderados';
import { getAulas } from 'api/aulas';
import Swal from 'sweetalert2'
import Link from "next/link"
import Router from 'next/dist/server/router';
import { useRouter } from 'next/router';

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

const FormEditAlumno = () => {
  const router = useRouter();
  const { id } = router.query;

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

  const [dniTipos, setDniTipos] = useState([]);
  const [apoderadoTipos, setApoderadoTipos] = useState([]);
  const [aulasTipos, setAulasTipos] = useState([])

  useEffect(() => {
    const fetchAlumnos = async () => {
      try {
        const data = await getAlumnoById(id);
        setFormData({
          ...data,
          dni_id: data.dni.dni_id,
          apoderado_id: data.apoderado_id,
          aulas_id: data.aulas_id

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

    fetchDniTipos();
    fetchApoderadoTipos();
    fetchAulasTipos();
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
      const { nombres_alumno, apellidos_alumno, direccion_alumno, telefono_alumno, numero_dni, dni_id, apoderado_id,  aulas_id} = formData;
  
      const formDataToUpdate = {
        nombres_alumno,
        apellidos_alumno,
        direccion_alumno,
        telefono_alumno,
        numero_dni,
        dni_id,
        apoderado_id,
        aulas_id,
      };
  
      // Realiza la solicitud de actualización
      const response = await updateAlumnos(id, formDataToUpdate);
  
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
                      {tipoAula.piso}

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
  )
};

export default FormEditAlumno
