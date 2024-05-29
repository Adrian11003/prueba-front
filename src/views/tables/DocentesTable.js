'use client'

import { useEffect, useState } from 'react';
import Swal from 'sweetalert2'
import { getDocentes, deleteDocentes } from "/api/docentes"

// MUI
import React from 'react';
import { Table, TableBody,Box, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, CardHeader, Card, TextField, Button, TablePagination } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Link from "next/link"

const DocentesTable = () => {

  const [docentes, setDocentes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDocentes();
        setDocentes(data);
      } catch (error) {
        console.error('Error al obtener los datos de los docentes:', error);
      }
    };

    fetchData();
  }, []);
  const [searchTerm, setSearchTerm] = useState('');

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
          await deleteDocentes(id);
          const updateDocente = docentes.filter((docentes) => docentes.id !== id);
          setDocentes(updateDocente);
          Swal.fire({
            title: "¡Eliminado!",
            text: "Tu docente ha sido eliminado.",
            icon: "success",
          }).then(() => {
            // Recargar la página después de mostrar la alerta de éxito
            window.location.reload();
          });
        } catch (error) {
          console.error("Error al eliminar el docente:", error);

          // Mostrar SweetAlert2 de error si ocurre algún problema

          Swal.fire({
            title: "Error",
            text: "Hubo un problema al eliminar el docente.",
            icon: "error",
          });
        }
      }
    });
  };


  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredDocentes = docentes.filter((docente) =>
    docente.nombre_docente.toLowerCase().includes(searchTerm.toLowerCase()) ||
    docente.apellido_docente.toLowerCase().includes(searchTerm.toLowerCase()) ||
    docente.email_docente.toLowerCase().includes(searchTerm.toLowerCase()) ||
    docente.telefono_docente.includes(searchTerm) ||
    String(docente.numero_dni).includes(searchTerm)
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
            <Link href="/Docentes/create/" passHref>
              <Button variant="contained" color="primary">
                Añadir Docente
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
            {filteredDocentes.map((docentes, index) => (
              <TableRow key={index}>
                <TableCell>{docentes.nombre_docente}</TableCell>
                <TableCell>{docentes.apellido_docente}</TableCell>
                <TableCell>{docentes.email_docente}</TableCell>
                <TableCell>{docentes.telefono_docente}</TableCell>
                <TableCell>{docentes.numero_dni}</TableCell>

                <TableCell>

                  <IconButton>
                    <Link href={`/Docentes/[${docentes.docente_id}]` }passHref>
                      <EditIcon />
                    </Link>
                  </IconButton>

                  <IconButton onClick={() => handleDelete(docentes.docente_id)}>
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

export default DocentesTable
