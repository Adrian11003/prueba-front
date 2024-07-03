'use client'

import { useEffect, useState } from 'react';
import Swal from 'sweetalert2'
import { getEstudiantes, deleteEstudiante } from "/api/alumnos"

// MUI
import React from 'react';
import { Table, TableBody,Box, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, CardHeader, Card, TextField, Button, TablePagination } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Link from "next/link"

const AlumnosTable = () => {

    const [estudiante, setAlumnos] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try{
                const data = await getEstudiantes()
                setAlumnos(data);
            }catch(error){
                console.log('Error al obtener los datos de los alumnos',error);
            }
        };
        fetchData();
    }, []);
    const [searchTerm, setSearchTerm] = useState('');

    const handleDelete = async (id) => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "¡No podrás revertir esto!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminarlo",
          }).then(async (result) => {
            if(result.isConfirmed){
                try{
                    await deleteEstudiante(id);
                    const updateEstudiante = estudiante.filter((alumnos) => estudiante.id !== id);
                    setAlumnos(updateEstudiante);
                    Swal.fire({
                        title: "¡Eliminado!",
                        text: "Tu alumno ha sido eliminado.",
                        icon: "success",
                      }).then(() => {
                        window.location.reload();
                      });
                } catch(error){
                    console.error("Error al eliminar el alumno:", error);

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

      const filteredAlumnos = estudiante.filter((estudiante) =>
        estudiante.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        estudiante.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
        String(estudiante.numero_documento).includes(searchTerm) ||
        estudiante.seccion.grado.nombre.toLowerCase().includes(searchTerm) ||
        String(estudiante.seccion.nombre).includes(searchTerm) ||
        String(estudiante.seccion.periodo.año).includes(searchTerm) 
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
                <Link href="/Alumnos/create/" passHref>
                  <Button variant="contained" color="primary">
                    Añadir Alumno
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
                  <TableCell>Documento</TableCell>
                  <TableCell>Grado</TableCell>
                  <TableCell>seccion</TableCell>
                  <TableCell>Periodo</TableCell>
                  <TableCell>Acción</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredAlumnos.map((estudiante, index) => (
                  <TableRow key={index}>
                    <TableCell>{estudiante.nombre}</TableCell>
                    <TableCell>{estudiante.apellido}</TableCell>
                    <TableCell>{estudiante.numero_documento}</TableCell>
                    <TableCell>{estudiante.seccion.grado.nombre}</TableCell>
                    <TableCell>{estudiante.seccion.nombre}</TableCell>
                    <TableCell>{estudiante.seccion.periodo.año}</TableCell>
    
                    <TableCell>
    
                      <IconButton>
                        <Link href={`/Alumnos/${estudiante.estudiante_id}` }passHref>
                          <EditIcon />
                        </Link>
                      </IconButton>
    
                      <IconButton onClick={() => handleDelete(estudiante.estudiante_id)}>
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

    export default AlumnosTable