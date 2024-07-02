'use client'

import { useEffect, useState } from 'react';
import Swal from 'sweetalert2'
import { getgrados, deletegrados } from "api/grados"

// MUI
import React from 'react';
import { Table, TableBody, Box, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, CardHeader, Card, TextField, Button, TablePagination } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Link from "next/link"

const GradosTable = () => {

  const [grados, setGrados] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getgrados();
        setGrados(data);
      } catch (error) {
        console.error('Error al obtener los datos de los cursos:', error);
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
          await deleteCursos(id);
          const updateCurso = cursos.filter((cursos) => cursos.id !== id);
          setGrados(updateCurso);
          Swal.fire({
            title: "¡Eliminado!",
            text: "Tu grado ha sido eliminado.",
            icon: "success",
          }).then(() => {
            // Recargar la página después de mostrar la alerta de éxito
            window.location.reload();
          });
        } catch (error) {
          console.error("Error al eliminar el grado:", error);

          // Mostrar SweetAlert2 de error si ocurre algún problema

          Swal.fire({
            title: "Error",
            text: "Hubo un problema al eliminar el grado.",
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

  const filteredGrados = grados.filter((grados) =>
    grados.nombre.toLowerCase().includes(searchTerm.toLowerCase())

  // ||
  //   cursos.docente.nombre_docente.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //   cursos.aula.grado.toLowerCase().includes(searchTerm.toLowerCase())
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
            <Link href="/Grados/create/" passHref>
              <Button variant="contained" color="primary">
                Añadir Grado
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
            </TableRow>
          </TableHead>
          <TableBody >
            {filteredGrados.map((grados, index) => (
              <TableRow key={index}>
                <TableCell>{grados.nombre}</TableCell>

                <TableCell>

                  <IconButton>
                    <Link href={`/Grados/${grados.grado_id}`} passHref>
                      <EditIcon />
                    </Link>
                  </IconButton>

                  <IconButton onClick={() => handleDelete(grados.grado_id)}>
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

export default GradosTable
