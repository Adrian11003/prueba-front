// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
// import Cookies from 'js-cookie';
// import CircularProgress from '@mui/material/CircularProgress';
// import Box from '@mui/material/Box';

// const withAuth = (WrappedComponent) => {
//   return (props) => {
//     const [loading, setLoading] = useState(true);
//     const [authenticated, setAuthenticated] = useState(false); // Nuevo estado para manejar la autenticación
//     const router = useRouter();

//     useEffect(() => {
//       const token = Cookies.get('token');
//       if (!token) {
//         router.push('pages/login'); // Redirige directamente a la página de login si no hay token
//       } else {
//         setAuthenticated(true); // Marca como autenticado si hay token
//         setLoading(false); // Deja de mostrar el spinner de carga
//       }
//     }, [router]);

//     if (loading) {
//       return (
//         <Box
//           sx={{
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'center',
//             height: '100vh',
//           }}
//         >
//           <CircularProgress />
//         </Box>
//       );
//     }

//     // Muestra el componente envuelto solo si está autenticado
//     return authenticated ? <WrappedComponent {...props} /> : null;
//   };
// };

// export default withAuth;