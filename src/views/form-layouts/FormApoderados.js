'use client'

// ** React Imports
import { forwardRef, useState, useEffect } from 'react'
import { getApoderados, createApoderados } from 'api/apoderados';
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

const FormAddApoderados = () => {
  // ** States
  // const [language, setLanguage] = useState([])
  // const [date, setDate] = useState(null)

  // const [values, setValues] = useState({
  //   password: '',
  //   password2: '',
  //   showPassword: false,
  //   showPassword2: false
  // })

  // Handle Password
  // const handlePasswordChange = prop => event => {
  //   setValues({ ...values, [prop]: event.target.value })
  // }

  // const handleClickShowPassword = () => {
  //   setValues({ ...values, showPassword: !values.showPassword })
  // }

  // const handleMouseDownPassword = event => {
  //   event.preventDefault()
  // }

  // // Handle Confirm Password
  // const handleConfirmChange = prop => event => {
  //   setValues({ ...values, [prop]: event.target.value })
  // }

  // const handleClickShowConfirmPassword = () => {
  //   setValues({ ...values, showPassword2: !values.showPassword2 })
  // }

  // const handleMouseDownConfirmPassword = event => {
  //   event.preventDefault()
  // }

  // // Handle Select
  // const handleSelectChange = event => {
  //   setLanguage(event.target.value)
  // }
  const [apoderados, setApoderados] = useState([]);
  const [dniTipos, setDniTipos] = useState([]);

  const [formData, setFormData] = useState({
    nombres_apoderado: '',
    apellidos_apoderado: '',
    direccion_apoderado: '',
    email_apoderado: '',
    telefono_apoderado: '',
    numero_dni: '',
    dni_id: '',
  });

  useEffect(() => {
    const fetchApoderados = async () => {
      try {
        const data = await getApoderados();
        setApoderados(data);
      } catch (error) {
        console.error('Error al obtener los docentes:', error);
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

    fetchDniTipos();
    fetchApoderados();
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
      const response = await createApoderados(formData);

      if (response) {
        Swal.fire({
          title: "Creación Exitosa!",
          text: "Apoderado creado exitosamente",
          icon: "success"
        }).then(() => {
          // Redireccionar al listado de alumnos
          window.location.href ="/Apoderados";
        });
      }
    } catch (error) {
      console.error('Error al crear el apoderado:', error);

      // Aquí puedes mostrar un mensaje de error al usuario
    }
  };

  return (
    <Card>
      <CardHeader title='Registrar Apoderado' titleTypographyProps={{ variant: 'h6' }} />
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
              <TextField fullWidth name='nombres_apoderado' label='Nombres' placeholder='Dereck' value={formData.nombres_apoderado} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label='Apellidos' placeholder='Muñoz' name="apellidos_apoderado" value={formData.apellidos_apoderado} onChange={handleChange} required />
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
              <TextField fullWidth label='Nro. Doc.' placeholder=''  name="numero_dni" value={formData.numero_dni} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label='Nro. Telef.' placeholder='+51 123456879' name="telefono_apoderado" value={formData.telefono_apoderado} onChange={handleChange}  required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth type='email' label='Email' placeholder='202010604@urp.edu.pe' name="email_apoderado" value={formData.email_apoderado} onChange={handleChange}  required />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField fullWidth label='Dirección' placeholder='Jr Mariano Campos 996' name="direccion_apoderado" value={formData.direccion_apoderado} onChange={handleChange} required/>
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
          <Link href="/Docentes" passHref>
          <Button size='large' color='secondary' variant='outlined'>
          
            Cancelar
          </Button>
          </Link>
        </CardActions>
      </form>
    </Card>
  )
}

export default FormAddApoderados
