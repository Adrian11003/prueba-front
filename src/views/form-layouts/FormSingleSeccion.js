'use client'

// ** React Imports
import { getSeccionById, updateSeccion} from 'api/seccion'
import { getgrados } from 'api/grados';
import { getPeriodos } from 'api/periodos';

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

const FormEditSeccion = () => {
    const router = useRouter();
    const { id } = router.query;

    const [formData, setFormData] = useState({
        nombre: '',
        aula:'',
        grado_id:'',
        periodo_id:''
    })

    const [gradoTipos, setgradoTipos] = useState([]);
    const [periodoTipos, setperiodoTipos] = useState([]);
    
    useEffect(() => {
        const fetchSeccion = async () => {
            try{
                const data = await getSeccionById(id);
                setFormData({
                    ...data,
                    grado_id: data.grado.grado_id,
                    periodo_id: data.periodo.periodo_id
                })
            } catch (error){
                console.error('Error al obtener el alumno:', error);
            }
        };

        if(id){
            fetchSeccion();
        }
    }, [id])

    useEffect(() => {
      const fetchperiodoTipos = async () => {
          try{
              const data = await getPeriodos();
              setperiodoTipos(data);
          } catch(error){
              console.error('Error al obtener los docentes', error);
          }
      };

      fetchperiodoTipos();
  }, [])

  useEffect(() => {
      const fetchgradoTipos = async () => {
          try{
              const data = await getgrados();
              setgradoTipos(data);
          } catch(error){
              console.error('Error al obtener los grados', error);
          }
      };

      fetchgradoTipos();
  }, [])

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
            const { nombre,aula,grado_id,periodo_id } = formData;

            const formDataToUpdate = {
                nombre,
                aula,
                grado_id,
                periodo_id
            };

            const response = await updateSeccion(id, formDataToUpdate);

            if(response){
                Swal.fire({
                    title: "Actualización Exitosa!",
                    text: "Sección actualizado exitosamente",
                    icon: "success"
                  }).then(() => {
                    // Redirecciona al listado de docentes
                    router.push("/Secciones");
                  });
            }
        } catch (error){
            console.error('Error al actualizar la sección:', error.response ? error.response.data : error.message);
            
            Swal.fire({
                title: "Error!",
                text: "Hubo un error al actualizar la sección. Por favor, inténtalo de nuevo.",
                icon: "error"
              });

        }
    }

    return (
      <Card>
      <CardHeader title='Actualizar Sección' titleTypographyProps={{ variant: 'h6' }} />
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
              <FormControl fullWidth>
                <InputLabel id='Aula-layouts-separator-select-label'>Grado</InputLabel>
                <Select
                  label='Grado'
                  defaultValue=''
                  id='form-layouts-separator-select'
                  labelId='form-layouts-separator-select-label'
                  name="grado_id" value={formData.grado_id} onChange={handleChange} required
                >
                  {gradoTipos.map((tipoGrados) => (
                    <MenuItem key={tipoGrados.grado_id} value={tipoGrados.grado_id}>
                      {tipoGrados.nombre}
                    </MenuItem>))}
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

                    </MenuItem>))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField fullWidth name='nombre' label='Nombre' placeholder='A' value={formData.nombre} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth name='aula' label='Aula' placeholder='B402' value={formData.aula} onChange={handleChange} required />
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
          <Link href="/Secciones" passHref>
            <Button size='large' color='secondary' variant='outlined'>

              Cancelar
            </Button>
          </Link>
        </CardActions>
      </form>
    </Card>
      )
}

export default FormEditSeccion