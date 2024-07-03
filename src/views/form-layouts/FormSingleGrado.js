'use client'

// ** React Imports
import { getgradosById,updateGrado} from 'api/grados'

// ** MUI Imports
import { useRouter } from 'next/router';
import Swal from 'sweetalert2'
import Link from "next/link"
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
import { useEffect, useState } from 'react'

const FormEditGrado = () => {
    const router = useRouter();
    const { id } = router.query;

    const [formData, setFormData] = useState({
        nombre: '',
    })

    
    useEffect(() => {
        const fetchGrados = async () => {
            try{
                const data = await getgradosById(id);
                setFormData({
                    ...data,
                })
            } catch (error){
                console.error('Error al obtener el alumno:', error);
            }
        };

        if(id){
            fetchGrados();
        }
    }, [id])
    
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const { nombre } = formData;

            const formDataToUpdate = {
                nombre
            };

            const response = await updateGrado(id, formDataToUpdate);

            if(response){
                Swal.fire({
                    title: "Actualización Exitosa!",
                    text: "Curso actualizado exitosamente",
                    icon: "success"
                  }).then(() => {
                    // Redirecciona al listado de docentes
                    router.push("/Grados");
                  });
            }
        } catch (error){
            console.error('Error al actualizar el curso:', error.response ? error.response.data : error.message);
            
            Swal.fire({
                title: "Error!",
                text: "Hubo un error al actualizar el grado. Por favor, inténtalo de nuevo.",
                icon: "error"
              });

        }
    }

    return (
      <Card>
      <CardHeader title='Actualizar Grado' titleTypographyProps={{ variant: 'h6' }} />
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
            Actualizar
          </Button>
          <Link href="/Grados" passHref>
            <Button size='large' color='secondary' variant='outlined'>

              Cancelar
            </Button>
          </Link>
        </CardActions>
      </form>
    </Card>
      )
}

export default FormEditGrado