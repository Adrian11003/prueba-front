// ** Icon imports
import Login from 'mdi-material-ui/Login'
import Table from 'mdi-material-ui/Table'
import CubeOutline from 'mdi-material-ui/CubeOutline'
import * as iconos from 'mdi-material-ui'

import HomeOutline from 'mdi-material-ui/HomeOutline'
import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'
import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline'
import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended'


const navigation = () => {
  return [
    {
      title: 'Dashboard',
      icon: HomeOutline,
      path: '/'
    },
    
    // {
    //   title: 'Account Settings',
    //   icon: AccountCogOutline,
    //   path: '/account-settings'
    // },
    // {
    //   sectionTitle: 'Pages'
    // },
    {
      icon: iconos.AccountSchoolOutline,
      title: 'Alumnos',
      path: '/Alumnos'
    },
    {
      icon: iconos.AccountChildOutline,
      title: 'Apoderados',
      path: '/Apoderados'
    },
    {
      icon: iconos.AccountTieOutline,
      title: 'Docentes',
      path: '/Docentes'
    },
    {
      icon: iconos.AlphabeticalVariant,
      title: 'Salones',
      path: '/Secciones'
    },
    {
      icon: iconos.Numeric,
      title: 'Grados',
      path: '/Grados'
    },
    {
      icon: iconos.CalculatorVariantOutline,
      title: 'Cursos',
      path: '/Cursos'
    },
    {
      icon: iconos.AccountCashOutline,
      title: 'Matricula',
      path: '/Matricula'
    },
 
    {
      icon: iconos.LibraryOutline,
      title: 'Aulas',
      path: '/Aulas'
    },

    // {
    //   title: 'Login',
    //   icon: Login,
    //   path: '/pages/login',
    //   openInNewTab: true
    // },
    // {
    //   title: 'Register',
    //   icon: AccountPlusOutline,
    //   path: '/pages/register',
    //   openInNewTab: true
    // },
    // {
    //   title: 'Error',
    //   icon: AlertCircleOutline,
    //   path: '/pages/error',
    //   openInNewTab: true
    // },
    // {
    //   sectionTitle: 'User Interface'
    // },
    // {
    //   title: 'Typography',
    //   icon: FormatLetterCase,
    //   path: '/typography'
    // },
    // {
    //   title: 'Icons',
    //   path: '/icons',
    //   icon: GoogleCirclesExtended
    // },
    // {
    //   title: 'Cards',
    //   icon: CreditCardOutline,
    //   path: '/cards'
    // },
    // {
    //   title: 'Tables',
    //   icon: Table,
    //   path: '/tables'
    // },
    // {
    //   icon: CubeOutline,
    //   title: 'Form Layouts',
    //   path: '/form-layouts'
    // }
  ]
}

// https://pictogrammers.com/library/mdi/category/places/

export default navigation
