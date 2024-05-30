// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Demo Components Imports
import FormDocentes from 'src/views/form-layouts/FormDocentes'
import FormAddAlumnos from 'src/views/form-layouts/FormAlumnos'


// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'

const LayoutAlumnos = () => {
  return (  
          <FormAddAlumnos/>
  )
}

export default LayoutAlumnos
