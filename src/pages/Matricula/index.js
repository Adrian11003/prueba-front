// ** MUI Imports
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'

// ** Demo Components Imports
import MatriculasTable from 'src/views/tables/MatriculasTable'

const MTable = () => {
    return (
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Typography variant='h5' color="#9155FD">
              Matriculas
          </Typography>
          <Typography variant='body2'>Gestionar Matriculas</Typography>
        </Grid>
        <Grid item xs={12}>
            <MatriculasTable/>
        </Grid>
      </Grid>
    )
  }
  
  export default MTable