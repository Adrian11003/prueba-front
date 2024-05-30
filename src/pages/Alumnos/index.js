// ** MUI Imports
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'

// ** Demo Components Imports
import DocentesTable from 'src/views/tables/DocentesTable'
import AlumnosTable from 'src/views/tables/AlumnosTable'


const MUITable = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h5'>
            Alumnos
        </Typography>
        <Typography variant='body2'>Gestionar Alumnos</Typography>
      </Grid>
      <Grid item xs={12}>
          <AlumnosTable/>
      </Grid>
    </Grid>
  )
}

export default MUITable
