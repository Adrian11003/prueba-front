'use client'

import { useEffect, useState } from 'react';
import Swal from 'sweetalert2'
import { getMatriculas, deleteMatricula } from "api/matricula"

// MUI
import React from 'react';
import { Table, TableBody,Box, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, CardHeader, Card, TextField, Button, TablePagination } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Link from "next/link"

const MatriculasTable = () => {

    const [matriculas, setMatriculas] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const data = await getMatriculas();
          setMatriculas(data);
        } catch (error) {
          console.error('Error al obtener los datos de las mastriculas:', error);
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
            await deleteMatricula(id);
            const updateMatricula = matriculas.filter((matriculas) => matriculas.id !== id);
            setMatriculas(updateMatricula);
            Swal.fire({
              title: "¡Eliminado!",
              text: "Tu matricula ha sido eliminado.",
              icon: "success",
            }).then(() => {
              // Recargar la página después de mostrar la alerta de éxito
              window.location.reload();
            });
          } catch (error) {
            console.error("Error al eliminar la matricula:", error);
  
            // Mostrar SweetAlert2 de error si ocurre algún problema
  
            Swal.fire({
              title: "Error",
              text: "Hubo un problema al eliminar la matricula.",
              icon: "error",
            });
          }
        }
      });
    };
  
  
    const handleSearchChange = (event) => {
      setSearchTerm(event.target.value);
    };
  
    const filteredMatriculas = matriculas.filter((matriculas) =>
      matriculas.estado.toLowerCase().includes(searchTerm.toLowerCase())
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
              <Link href="/Matricula/create/" passHref>
                <Button variant="contained" color="primary">
                  Matricula Alumno
                </Button>
              </Link>
            </Box>
          }
        />
        <TableContainer  component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Alumno</TableCell>
                <TableCell>Grado-Seccion</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Acción</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredMatriculas.map((matriculas, index) => (
                <TableRow key={index}>
                  <TableCell>{`${matriculas.estudiante.nombre} ${matriculas.estudiante.apellido}`}</TableCell>
                  <TableCell>{`${matriculas.seccion.grado.nombre} - ${matriculas.seccion.nombre}`} </TableCell>
                  <TableCell>{matriculas.estado}</TableCell>
                  <TableCell>
  
                    <IconButton>
                      <Link href={`/Matricula/${matriculas.matricula_id}` }passHref>
                        <EditIcon />
                      </Link>
                    </IconButton>
  
                    <IconButton onClick={() => handleDelete(matriculas.matricula_id)}>
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
  
  export default MatriculasTable
  