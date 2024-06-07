'use client'

// ** React Imports
import { forwardRef, useState, useEffect } from 'react'
import { getAulaById, updateAula } from 'api/aulas'
import {  getSeccion } from 'api/seccion';

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
import { NewspaperVariantMultiple } from 'mdi-material-ui';

const FormEditAula = () => {
    const router = useRouter();
    const { id } = router.query;

    const [formData, setFormData] = useState({
        numero_aula: '',
        capacidad: '',
        piso: '',
        seccion_id: '',
    });

    const [seccionTipos, setSeccionTipos] = useState([]);

    useEffect(() => {
        const fetchAulas = async () => {
          try {
            const data = await getAulaById(id);
            setFormData({
              ...data,
              seccion_id: data.seccion.seccion_id
            });
          } catch (error) {
            console.error('Error al obtener el aula:', error);
          }
        };
    
        if (id) {
           fetchAulas();
        }
      }, [id]);

      useEffect(() => {
        const fetchSeccionTipos = async () => {
            try {
              const data = await getSeccion();
              setSeccionTipos(data);
            } catch (error) {
              console.error('Error al obtener las secciones:', error);
            }
          };

          fetchSeccionTipos();
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

        try{
            const { numero_aula, capacidad, piso, seccion_id } = formData;

            const formDataToUpdate = {
                numero_aula,
                capacidad: parseInt(capacidad),
                piso,
                seccion_id
            };

            const response = await updateAula(id, formDataToUpdate);

            if(response){
                Swal.fire({
                    title: "Actualización Exitosa!",
                    text: "Aula actualizado exitosamente",
                    icon: "success"
                  }).then(() => {
                    // Redirecciona al listado de docentes
                    router.push("/Aulas");
                  });
            }
        } catch (error){
            console.error('Error al actualizar el aula:', error.response ? error.response.data : error.message);
            
            Swal.fire({
                title: "Error!",
                text: "Hubo un error al actualizar el aula. Por favor, inténtalo de nuevo.",
                icon: "error"
              });
        }
      };

      return (
        <Card>
          <CardHeader title='Actualizar Aula' titleTypographyProps={{ variant: 'h6' }} />
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
                Actualizar
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

export default FormEditAula