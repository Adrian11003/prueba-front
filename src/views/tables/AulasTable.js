'use client'

import { useEffect, useState } from 'react';
import Swal from 'sweetalert2'
import { getCursosGrado, deleteCursosGrado } from "api/cursosGrado"

// MUI
import React from 'react';
import { Table, TableBody, Box, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, CardHeader, Card, TextField, Button, TablePagination } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Link from "next/link"

const CursoGradoTable = () => {

  const [cursoGrado, setCursoGrado] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCursosGrado();
        setCursoGrado(data);
      } catch (error) {
        console.error('Error al obtener los datos de las cursoGrado:', error);
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
          await deleteCursosGrado(id);
          const updateAula = cursoGrado.filter((cursoGrado) => cursoGrado.id !== id);
          setCursoGrado(updateAula);
          Swal.fire({
            title: "¡Eliminado!",
            text: "Tu aula ha sido eliminada.",
            icon: "success",
          }).then(() => {
            // Recargar la página después de mostrar la alerta de éxito
            window.location.reload();
          });
        } catch (error) {
          console.error("Error al eliminar el aula:", error);

          // Mostrar SweetAlert2 de error si ocurre algún problema

          Swal.fire({
            title: "Error",
            text: "Hubo un problema al eliminar el aula.",
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

  const filteredcursoGrado = cursoGrado.filter((cursoGrado) =>
    cursoGrado.grado.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cursoGrado.capacidad.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cursoGrado.piso.toLowerCase().includes(searchTerm.toLowerCase())
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
            <Link href="/cursoGrado/create/" passHref>
              <Button variant="contained" color="primary">
                Dar un curso a un horario
              </Button>
            </Link>
          </Box>
        }
      />
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead >
            <TableRow >
              <TableCell>Curso</TableCell>
              <TableCell>Grado</TableCell>
              <TableCell>Periodo</TableCell>
              <TableCell>Acción</TableCell>
            </TableRow>
          </TableHead>
          <TableBody >
            {filteredcursoGrado.map((cursoGrado, index) => (
              <TableRow key={index}>
                <TableCell>{cursoGrado.grado.nombre}</TableCell>
                <TableCell>{cursoGrado.curso.nombre}</TableCell>
                <TableCell>{cursoGrado.periodo.año}</TableCell>

                <TableCell>

                  <IconButton>
                    <Link href={`/Malla/${cursoGrado.cursoGrado_id}`} passHref>
                      <EditIcon />
                    </Link>
                  </IconButton>

                  <IconButton onClick={() => handleDelete(cursoGrado.cursoGrado_id)}>
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

export default CursoGradoTable
