// ** React Imports
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import Link from 'next/link';

// ** MUI Imports
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import CardHeader from '@mui/material/CardHeader';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

// ** API Imports (importa tus funciones de API aquí)
import { getMatriculas, createMatriculas } from 'api/matricula';
import { getEstudiantes } from 'api/alumnos';
import { getSecciones } from 'api/seccion';

const FormAddMatricula = () => {
  const [matriculas, setMatriculas] = useState([]);
  const [estudianteTipos, setEstudianteTipos] = useState([]);
  const [seccionTipos, setSeccionTipos] = useState([]);

  const [formData, setFormData] = useState({
    estado: '',
    estudiante_id: '',
    seccion_id: '',
  });

  const [selectedEstudiante, setSelectedEstudiante] = useState(null);
  const [selectedSeccion, setSelectedSeccion] = useState(null);

  useEffect(() => {
    const fetchMatriculas = async () => {
      try {
        const data = await getMatriculas();
        setMatriculas(data);
      } catch (error) {
        console.error('Error al obtener matriculas', error);
      }
    };

    const fetchEstudianteTipos = async () => {
      try {
        const data = await getEstudiantes();
        setEstudianteTipos(data);
      } catch (error) {
        console.error('Error al obtener los alumnos:', error);
      }
    };

    const fetchSeccionTipos = async () => {
      try {
        const data = await getSecciones();
        setSeccionTipos(data);
      } catch (error) {
        console.error('Error al obtener las secciones:', error);
      }
    };

    fetchMatriculas();
    fetchEstudianteTipos();
    fetchSeccionTipos();
  }, []);

  const handleChangeEstudiante = (e) => {
    const estudianteId = e.target.value;
    setSelectedEstudiante(estudianteTipos.find(estudiante => estudiante.estudiante_id === estudianteId));
    setFormData({
      ...formData,
      estudiante_id: estudianteId,
    });
  };

  const handleChangeSeccion = (e) => {
    const seccionId = e.target.value;
    setSelectedSeccion(seccionTipos.find(seccion => seccion.seccion_id === seccionId));
    setFormData({
      ...formData,
      seccion_id: seccionId,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await createMatriculas(formData);

      if (response) {
        Swal.fire({
          title: 'Creación Exitosa!',
          text: 'Matricula creada exitosamente',
          icon: 'success',
        }).then(() => {
          // Redireccionar al listado de matriculas
          window.location.href = '/Matricula';
        });
      }
    } catch (error) {
      console.error('Error al crear la matricula:', error);
      
      // Mostrar mensaje de error al usuario si es necesario
    }
  };

  const currentYear = new Date().getFullYear().toString();
  const filteredSeccionTipos = seccionTipos.filter(seccion => seccion.periodo?.año === currentYear);

  return (
    <Card>
      <CardHeader title='Matricula Alumno' titleTypographyProps={{ variant: 'h6' }} />
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
              <FormControl fullWidth>
                <InputLabel id='estado-label'>Estado</InputLabel>
                <Select
                  label='Estado'
                  defaultValue='Pendiente'
                  id='estado-select'
                  labelId='estado-label'
                  name='estado'
                  value={formData.estado}
                  onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
                  required
                >
                  <MenuItem value='Pendiente'>Pendiente</MenuItem>
                  <MenuItem value='Pagado'>Pagado</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id='apoderado-label'>Tipo de Alumno</InputLabel>
                <Select
                  label='Tipo de Alumno'
                  defaultValue=''
                  id='apoderado-select'
                  labelId='apoderado-label'
                  name='estudiante_id'
                  value={formData.estudiante_id}
                  onChange={handleChangeEstudiante}
                  required
                >
                  {estudianteTipos.map((tipoEstudiante) => (
                    <MenuItem key={tipoEstudiante.estudiante_id} value={tipoEstudiante.estudiante_id}>
                      {`${tipoEstudiante.nombre} ${tipoEstudiante.apellido}`}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id='seccion-label'>Salón</InputLabel>
                <Select
                  label='Salon'
                  defaultValue=''
                  id='seccion-select'
                  labelId='seccion-label'
                  name='seccion_id'
                  value={formData.seccion_id}
                  onChange={handleChangeSeccion}
                  required
                >
                  {selectedEstudiante && selectedEstudiante.seccion && (
                    <MenuItem key={selectedEstudiante.seccion.seccion_id} value={selectedEstudiante.seccion.seccion_id}>
                      {`${selectedEstudiante.seccion.nombre} - ${selectedEstudiante.seccion.grado?.nombre || 'N/A'} - ${selectedEstudiante.seccion.periodo?.año}`}
                    </MenuItem>
                  )}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
        <Divider sx={{ margin: 0 }} />
        <CardActions>
          <Button size='large' type='submit' sx={{ mr: 2 }} variant='contained'>
            Realizar Matricula
          </Button>
          <Link href='/Matricula' passHref>
            <Button size='large' color='secondary' variant='outlined'>
              Cancelar
            </Button>
          </Link>
        </CardActions>
      </form>
    </Card>
  );
};

export default FormAddMatricula;

