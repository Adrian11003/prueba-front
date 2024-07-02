// import { NextResponse } from 'next/server';

// export function middleware(req) {
//   const token = req.cookies.get('token');

//   // Si no hay token y la ruta es '/', redirige a '/login'
//   if (!token && req.nextUrl.pathname === '/') {
//     return NextResponse.redirect(new URL('pages/login', req.url));
//   }

//   // Permite el acceso a otras rutas
//   return NextResponse.next();
// }

// // Configura las rutas a las que se aplica el middleware
// export const config = {
//   matcher: ['/', '/admin/:path*'] // Ajusta según sea necesario
// };
