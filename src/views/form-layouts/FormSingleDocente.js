'use client'

// ** React Imports
import { forwardRef, useState, useEffect } from 'react'
import { getDocentesById, updateDocentes } from 'api/docentes';
import { getDniTipos } from 'api/dni';
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

const FormEditDocente = () => {
  const router = useRouter();
  const { id } = router.query;

  const [formData, setFormData] = useState({
    nombre_docente: '',
    apellido_docente: '',
    direccion_docente: '',
    email_docente: '',
    telefono_docente: '',
    numero_dni: '',
    dni_id: '',
  });

  const [dniTipos, setDniTipos] = useState([]);

  useEffect(() => {
    const fetchDocente = async () => {
      try {
        const data = await getDocentesById(id);
        setFormData(data);
        console.log(data); // Verifica que los datos se impriman correctamente en la consola
      } catch (error) {
        console.error('Error al obtener el docente:', error);
      }
    };

    if (id) {
      fetchDocente();
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

    fetchDniTipos();
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
      const { nombre_docente, apellido_docente, direccion_docente, email_docente, telefono_docente, numero_dni, dni_id } = formData;
  
      const formDataToUpdate = {
        nombre_docente,
        apellido_docente,
        direccion_docente,
        email_docente,
        telefono_docente,
        numero_dni,
        dni_id
      };
  
      // Realiza la solicitud de actualización
      const response = await updateDocentes(id, formDataToUpdate);
  
      if (response) {
        Swal.fire({
          title: "Actualización Exitosa!",
          text: "Docente actualizado exitosamente",
          icon: "success"
        }).then(() => {
          // Redirecciona al listado de docentes
          router.push("/Docentes");
        });
      }
    } catch (error) {
      console.error('Error al actualizar el docente:', error.response ? error.response.data : error.message);
      // Muestra un mensaje de error al usuario
      Swal.fire({
        title: "Error!",
        text: "Hubo un error al actualizar el docente. Por favor, inténtalo de nuevo.",
        icon: "error"
      });
    }
  };

  return (
    <Card>
      <CardHeader title='Modificar Docente' titleTypographyProps={{ variant: 'h6' }} />
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
              <TextField fullWidth name='nombre_docente' label='Nombres' placeholder='Dereck' value={formData.nombre_docente} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label='Apellidos' placeholder='Muñoz' name="apellido_docente" value={formData.apellido_docente} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id='Docentes-layouts-separator-select-label'>Tipo de Documento</InputLabel>
                <Select
                  label='Tipo de Documento'
                  id='form-layouts-separator-select'
                  labelId='form-layouts-separator-select-label'
                  name="dni_id"
                  value={formData.dni_id || ''}
                  onChange={handleChange}
                  required
                >
                  <MenuItem value=''>Seleccionar tipo de documento</MenuItem>
                  {dniTipos.map((tipoDni) => (
                    <MenuItem key={tipoDni.dni_id} value={tipoDni.dni_id}>
                      {tipoDni.tipo_dni}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label='Nro. Doc.' placeholder='' name="numero_dni" value={formData.numero_dni} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label='Nro. Telef.' placeholder='+51 123456879' name="telefono_docente" value={formData.telefono_docente} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth type='email' label='Email' placeholder='202010604@urp.edu.pe' name="email_docente" value={formData.email_docente} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField fullWidth label='Dirección' placeholder='Jr Mariano Campos 996' name="direccion_docente" value={formData.direccion_docente} onChange={handleChange} required />
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

export default FormEditDocente
