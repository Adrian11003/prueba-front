'use client'

import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { getSecciones, deleteSeccion } from 'api/seccion';

// MUI
import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead,InputLabel,MenuItem, FormControl,TableRow, Paper, IconButton, CardHeader, Card, Select, Button, Box, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Link from 'next/link';

const SeccionTable = () => {
  const [seccion, setSeccion] = useState([]);
  const [periodoFilter, setPeriodoFilter] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSecciones();
        setSeccion(data);
      } catch (error) {
        console.error('Error al obtener los datos de las secciones:', error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteSeccion(id);
          const updatedSeccion = seccion.filter((seccion) => seccion.id !== id);
          setSeccion(updatedSeccion);
          Swal.fire({
            title: '¡Eliminado!',
            text: 'Tu seccion ha sido eliminado.',
            icon: 'success',
          }).then(() => {
            window.location.reload();
          });
        } catch (error) {
          console.error('Error al eliminar la seccion:', error);
          Swal.fire({
            title: 'Error',
            text: 'Hubo un problema al eliminar la seccion.',
            icon: 'error',
          });
        }
      }
    });
  };

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handlePeriodoChange = (event) => {
    setPeriodoFilter(event.target.value);
  };

  const filteredSeccion = seccion.filter((seccion) => 
    !periodoFilter || seccion.periodo.año === periodoFilter
  );

  const groupedSecciones = filteredSeccion.reduce((acc, curr) => {
    if (!acc[curr.grado.nombre]) {
      acc[curr.grado.nombre] = {};
    }
    if (!acc[curr.grado.nombre][curr.periodo.año]) {
      acc[curr.grado.nombre][curr.periodo.año] = [];
    }
    acc[curr.grado.nombre][curr.periodo.año].push(curr);

    return acc;
  }, {});
  const periodos = [...new Set(seccion.map((seccion) => seccion.periodo.año))];

  return (
    <Card>
      <CardHeader
        title={
          <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
            <FormControl variant="outlined" size="small" style={{ minWidth: 200 }}>
              <InputLabel>Filtrar por Período</InputLabel>
              <Select
                value={periodoFilter}
                onChange={handlePeriodoChange}
                label="Filtrar por Período"
              >
                <MenuItem value="">
                  <em>Todos</em>
                </MenuItem>
                {periodos.map((periodo) => (
                  <MenuItem key={periodo} value={periodo}>{periodo}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <Link href="/Secciones/create/" passHref>
              <Button variant="contained" color="primary">
                Añadir Seccion
              </Button>
            </Link>
          </Box>
        }
      />
       <Box p={2}>
        {Object.keys(groupedSecciones).map((grado) => (
          <Box key={grado} mb={4}>
            <Typography variant="h5" gutterBottom>{grado}</Typography>
            {Object.keys(groupedSecciones[grado]).map((periodo) => (
              <Box key={periodo} mb={2}>
                <Typography variant="h6" gutterBottom>Periodo: {periodo}</Typography>
                <TableContainer component={Paper}>
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Nombre</TableCell>
                        <TableCell>Aula</TableCell>
                        <TableCell>Grado</TableCell>
                        <TableCell>Periodo</TableCell>
                        <TableCell>Acción</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {groupedSecciones[grado][periodo].map((seccion) => (
                        <TableRow key={seccion.seccion_id}>
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
                            <IconButton onClick={() => handleDelete(seccion.seccion_id)}>
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            ))}
          </Box>
        ))}
      </Box>
    </Card>
  );
};

export default SeccionTable;
