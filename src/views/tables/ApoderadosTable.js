'use client'

import { useEffect, useState } from 'react';
import Swal from 'sweetalert2'
import { getApoderados, deleteApoderado } from "/api/apoderados"

// MUI
import React from 'react';
import { Table, TableBody,Box, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, CardHeader, Card, TextField, Button, TablePagination } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Link from "next/link"

const ApoderadosTable = () => {

    const [apoderados, setApoderados] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getApoderados();
                setApoderados(data);
            } catch (error) {
                console.error('Error al obtener los datos de los apoderados:', error);
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
              await deleteApoderado(id);
              const updateApoderado = apoderados.filter((apoderado) => apoderado.id !== id);
              setApoderados(updateApoderado);
              Swal.fire({
                title: "¡Eliminado!",
                text: "Tu Apoderado ha sido eliminado.",
                icon: "success",
              });
            } catch (error) {
              console.error("Error al eliminar el apoderado:", error);

              // Mostrar SweetAlert2 de error si ocurre algún problema
              Swal.fire({
                title: "Error",
                text: "Hubo un problema al eliminar el apoderado.",
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

  const filteredApoderados = apoderados.filter((apoderado) =>
    apoderado.nombres_apoderado.toLowerCase().includes(searchTerm.toLowerCase()) ||
    apoderado.apellidos_apoderado.toLowerCase().includes(searchTerm.toLowerCase()) ||
    apoderado.email_apoderado.toLowerCase().includes(searchTerm.toLowerCase()) ||
    apoderado.telefono_apoderado.includes(searchTerm) ||
    String(apoderados.numero_dni).includes(searchTerm)
  );

  return (
    <Card>
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
            <Link href="/Apoderados/create/" passHref>
              <Button variant="contained" color="primary">
                Añadir apoderado
              </Button>
            </Link>
          </Box>
        }
      />
      <TableContainer  component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Apellido</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Telefono</TableCell>
              <TableCell>Documento</TableCell>
              <TableCell>Acción</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredApoderados.map((apoderados, index) => (
              <TableRow key={index}>
                <TableCell>{apoderados.nombres_apoderado}</TableCell>
                <TableCell>{apoderados.apellidos_apoderado}</TableCell>
                <TableCell>{apoderados.email_apoderado}</TableCell>
                <TableCell>{apoderados.telefono_apoderado}</TableCell>
                <TableCell>{apoderados.numero_dni}</TableCell>

                <TableCell>

                  <IconButton>
                    <Link href={`/Apoderados/${apoderados.apoderado_id}` }passHref>
                      <EditIcon />
                    </Link>
                  </IconButton>

                  <IconButton onClick={() => handleDelete(apoderados.apoderado_id)}>
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

export default ApoderadosTable
