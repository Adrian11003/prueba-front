'use client'

// ** React Imports
import { forwardRef, useState, useEffect } from 'react'
import { getDocentesById, updateDocentes } from 'api/docentes';
import { getDniTipos } from 'api/dni';
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
        const data = await getDocentesById(doncente_id);
        setFormData(data);
        console.log(data); // Verifica que los datos se impriman correctamente en la consola
        setFormData(data);
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
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateDocentes(id, formData);

      // Puedes redirigir al usuario a la página de detalles del docente o a la lista de docentes

      router.push(`/Docentes/detail/${id}`);

    } catch (error) {
      console.error('Error al editar el docente:', error);

      // Aquí puedes mostrar un mensaje de error al usuario
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
                  defaultValue=''
                  id='form-layouts-separator-select'
                  labelId='form-layouts-separator-select-label'
                  name="dni_id" value={formData.dni_id} onChange={handleChange} required
                >
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
