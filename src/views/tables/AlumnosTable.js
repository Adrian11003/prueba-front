'use client'

import { useEffect, useState } from 'react';
import Swal from 'sweetalert2'
import { getAlumnos, deleteAlumno } from "/api/alumnos"

// MUI
import React from 'react';
import { Table, TableBody,Box, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, CardHeader, Card, TextField, Button, TablePagination } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Link from "next/link"

const AlumnosTable = () => {

    const [alumnos, setAlumnos] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try{
                const data = await getAlumnos()
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
                    await deleteAlumno(id);
                    const updateAlumno = alumnos.filter((alumnos) => alumnos.id !== id);
                    setAlumnos(updateAlumno);
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

      const filteredAlumnos = alumnos.filter((alumnos) =>
        alumnos.nombres_alumno.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alumnos.apellidos_alumno.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alumnos.telefono_alumno.toLowerCase().includes(searchTerm.toLowerCase()) ||
        String(alumnos.numero_dni).includes(searchTerm) ||
        String(alumnos.aula.numero_aula).includes(searchTerm)
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
                  <TableCell>Telefono</TableCell>
                  <TableCell>Documento</TableCell>
                  <TableCell>Aula</TableCell>
                  <TableCell>Acción</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredAlumnos.map((alumnos, index) => (
                  <TableRow key={index}>
                    <TableCell>{alumnos.nombres_alumno}</TableCell>
                    <TableCell>{alumnos.apellidos_alumno}</TableCell>
                    <TableCell>{alumnos.telefono_alumno}</TableCell>
                    <TableCell>{alumnos.numero_dni}</TableCell>
                    <TableCell>{alumnos.aula.numero_aula}</TableCell>
    
                    <TableCell>
    
                      <IconButton>
                        <Link href={`/Alumnos/${alumnos.alumno_id}` }passHref>
                          <EditIcon />
                        </Link>
                      </IconButton>
    
                      <IconButton onClick={() => handleDelete(alumnos.alumno_id)}>
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