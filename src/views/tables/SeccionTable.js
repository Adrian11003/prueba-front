'use client'

import { useEffect, useState } from 'react';
import Swal from 'sweetalert2'
import { getSecciones, deleteSeccion } from "api/seccion"

// MUI
import React from 'react';
import { Table, TableBody, Box, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, CardHeader, Card, TextField, Button, TablePagination } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Link from "next/link"

const SeccionTable = () => {

  const [seccion, setseccion] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSecciones();
        setseccion(data);
      } catch (error) {
        console.error('Error al obtener los datos de las secciones:', error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    // Mostrar el SweetAlert2 de confirmación
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminarlo",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteSeccion(id);
          const updateSeccion = seccion.filter((seccion) => seccion.id !== id);
          setseccion(updateSeccion);
          Swal.fire({
            title: "¡Eliminado!",
            text: "Tu seccion ha sido eliminado.",
            icon: "success",
          }).then(() => {
            // Recargar la página después de mostrar la alerta de éxito
            window.location.reload();
          });
        } catch (error) {
          console.error("Error al eliminar la seccion:", error);

          // Mostrar SweetAlert2 de error si ocurre algún problema

          Swal.fire({
            title: "Error",
            text: "Hubo un problema al eliminar la seccion.",
            icon: "error",
          });
        }
      }
    });
  };

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredseccion = seccion.filter((seccion) =>
    seccion.nombre.toLowerCase().includes(searchTerm.toLowerCase())||
  seccion.aula.toLowerCase().includes(searchTerm.toLowerCase())||
   seccion.grado.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
     seccion.periodo.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card >
      <CardHeader
        title={
          <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
            <TextField
              label="Buscar"
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={handleSearchChange}
              style={{ marginRight: 16 }}
            />
            <Link href="/Secciones/create/" passHref>
              <Button variant="contained" color="primary">
                Añadir Seccion
              </Button>
            </Link>
          </Box>
        }
      />
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead >
            <TableRow >
              <TableCell>Nombre</TableCell>
              <TableCell>Aula</TableCell>
              <TableCell>Grado</TableCell>
              <TableCell>Periodo</TableCell>
              <TableCell>Accion</TableCell>
            </TableRow>
          </TableHead>
          <TableBody >
            {filteredseccion.map((seccion, index) => (
              <TableRow key={index}>
                <TableCell>{seccion.nombre}</TableCell>
                <TableCell>{seccion.aula}</TableCell>
                <TableCell>{seccion.grado.nombre}</TableCell>
                <TableCell>{seccion.periodo.año}</TableCell>
                <TableCell>
                  <IconButton>
                    <Link href={`/Secciones/${seccion.seccion_id}`} passHref>
                      <EditIcon />
                    </Link>
                  </IconButton>
                  <IconButton onClick={() => handleDelete(seccion.grado_id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default SeccionTable
