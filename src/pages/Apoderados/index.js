// ** MUI Imports
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'

// ** Demo Components Imports
import ApoderadosTable from 'src/views/tables/ApoderadosTable'


const ApTable = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h5'>
          <Link href='https://mui.com/components/tables/' target='_blank'>
            Docentes
          </Link>
        </Typography>
        <Typography variant='body2'>Gestionar Apoderados</Typography>
      </Grid>
      <Grid item xs={12}>
          <ApoderadosTable/>
      </Grid>
    </Grid>
  )
}

export default ApTable
