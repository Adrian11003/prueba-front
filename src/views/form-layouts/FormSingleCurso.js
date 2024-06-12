'use client'

// ** React Imports
import { getCursosById, updateCurso} from 'api/cursos'

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
import { getDocentes } from 'api/docentes'
import { getAulas } from 'api/aulas'

const FormEditCurso = () => {
    const router = useRouter();
    const { id } = router.query;

    const [formData, setFormData] = useState({
        nombre_cursos: '',
        docente_id: '',
        aulas_id: '',
    })

    const [docenteTipos, setDocenteTipos] = useState([]);
    const [aulaTipos, setAulasTipos] = useState([]);
    3
    useEffect(() => {
        const fetchCursos = async () => {
            try{
                const data = await getCursosById(id);
                setFormData({
                    ...data,
                    docente_id: data.docente.docente_id,
                    aulas_id: data.aula.aulas_id
                })
            } catch (error){
                console.error('Error al obtener el alumno:', error);
            }
        };

        if(id){
            fetchCursos();
        }
    }, [id])

    useEffect(() => {
        const fetchDocenteTipos = async () => {
            try{
                const data = await getDocentes();
                setDocenteTipos(data);
            } catch(error){
                console.error('Error al obtener los docentes', error);
            }
        };

        fetchDocenteTipos();
    }, [])

    useEffect(() => {
        const fetchAulasTipos = async () => {
            try{
                const data = await getAulas();
                setAulasTipos(data);
            } catch(error){
                console.error('Error al obtener las aulas', error);
            }
        };

        fetchAulasTipos();
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
            const { nombre_cursos, docente_id, aulas_id } = formData;

            const formDataToUpdate = {
                nombre_cursos,
                docente_id,
                aulas_id
            };

            const response = await updateCurso(id, formDataToUpdate);

            if(response){
                Swal.fire({
                    title: "Actualización Exitosa!",
                    text: "Curso actualizado exitosamente",
                    icon: "success"
                  }).then(() => {
                    // Redirecciona al listado de docentes
                    router.push("/Cursos");
                  });
            }
        } catch (error){
            console.error('Error al actualizar el curso:', error.response ? error.response.data : error.message);
            
            Swal.fire({
                title: "Error!",
                text: "Hubo un error al actualizar el curso. Por favor, inténtalo de nuevo.",
                icon: "error"
              });

        }
    }

    return (
      <Card>
      <CardHeader title='Actualizar Curso' titleTypographyProps={{ variant: 'h6' }} />
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
                <InputLabel id='Aula-layouts-separator-select-label'>Aula</InputLabel>
                <Select
                  label='Aula'
                  defaultValue=''
                  id='form-layouts-separator-select'
                  labelId='form-layouts-separator-select-label'
                  name="aulas_id" value={formData.aulas_id} onChange={handleChange} required
                >
                  {aulaTipos.map((tipoAula) => (
                    <MenuItem key={tipoAula.aulas_id} value={tipoAula.aulas_id}>
                      {tipoAula.grado}
                    </MenuItem>))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id='Docentes-layouts-separator-select-label'>Docente</InputLabel>
                <Select
                  label='Docente'
                  defaultValue=''
                  id='form-layouts-separator-select'
                  labelId='form-layouts-separator-select-label'
                  name="docente_id" value={formData.docente_id} onChange={handleChange} required
                >
                  {docenteTipos.map((tipoDocente) => (
                    <MenuItem key={tipoDocente.docente_id} value={tipoDocente.docente_id}>
                      {tipoDocente.nombre_docente}

                    </MenuItem>))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField fullWidth name='nombre_cursos' label='Nombre' placeholder='Comunicación' value={formData.nombre_cursos} onChange={handleChange} required />
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

export default FormEditCurso