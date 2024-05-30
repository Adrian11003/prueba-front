// ** MUI Imports
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import AulasTable from 'src/views/tables/AulasTable'


const AuTable = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h5' color="#9155FD">
            Aulas
        </Typography>
        <Typography variant='body2'>Gestionar Aulas</Typography>
      </Grid>
      <Grid item xs={12}>
          <AulasTable/>
      </Grid>
    </Grid>
  )
}

export default AuTable
