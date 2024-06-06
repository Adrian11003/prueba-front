'use client'

import { useEffect, useState } from 'react';
import Swal from 'sweetalert2'
import { getAulas, deleteAulas } from "api/aulas"

// MUI
import React from 'react';
import { Table, TableBody, Box, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, CardHeader, Card, TextField, Button, TablePagination } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Link from "next/link"

const AulasTable = () => {

  const [aulas, setAulas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAulas();
        setAulas(data);
      } catch (error) {
        console.error('Error al obtener los datos de las aulas:', error);
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
          await deleteAulas(id);
          const updateAula = aulas.filter((aulas) => aulas.id !== id);
          setAulas(updateAula);
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

  const filteredAulas = aulas.filter((aulas) =>
    aulas.numero_aula.toLowerCase().includes(searchTerm.toLowerCase()) ||
    aulas.capacidad.toLowerCase().includes(searchTerm.toLowerCase()) ||
    aulas.piso.toLowerCase().includes(searchTerm.toLowerCase())
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
            <Link href="/Aulas/create/" passHref>
              <Button variant="contained" color="primary">
                Añadir Aula
              </Button>
            </Link>
          </Box>
        }
      />
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead >
            <TableRow >
              <TableCell>Número</TableCell>
              <TableCell>Capacidad</TableCell>
              <TableCell>Piso</TableCell>
              <TableCell>Acción</TableCell>
            </TableRow>
          </TableHead>
          <TableBody >
            {filteredAulas.map((aulas, index) => (
              <TableRow key={index}>
                <TableCell>{aulas.numero_aula}</TableCell>
                <TableCell>{aulas.capacidad}</TableCell>
                <TableCell>{aulas.piso}</TableCell>

                <TableCell>

                  <IconButton>
                    <Link href={`/Aulas/${aulas.aulas_id}`} passHref>
                      <EditIcon />
                    </Link>
                  </IconButton>

                  <IconButton onClick={() => handleDelete(aulas.aulas_id)}>
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

export default AulasTable
