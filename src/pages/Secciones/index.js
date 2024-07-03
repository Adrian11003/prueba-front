// ** MUI Imports
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import SeccionTable from 'src/views/tables/SeccionTable'


const GrTable = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h5' color="#9155FD">
            Salones
        </Typography>
        <Typography variant='body2'>Gestionar Salones</Typography>
      </Grid>
      <Grid item xs={12}>
          <SeccionTable/>
      </Grid>
    </Grid>
  )
}

export default GrTable
