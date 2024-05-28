import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';



const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com' , phone:'454646'},
  { id: 2, name: 'Jane Smith', email: 'jane@example.com',phone:'454646' },
  { id: 3, name: 'Alice Johnson', email: 'alice@example.com',phone:'454646' },

  // More users can be added here
];

const UserTable = () => {

  const handleEdit = (userId) => {
    // Implement edit functionality here
    console.log("Edit user with ID:", userId);
  };

  const handleDelete = (userId) => {
    // Implement delete functionality here
    console.log("Delete user with ID:", userId);
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell> {user.phone}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleEdit(user.id)} aria-label="edit">
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(user.id)} aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserTable;
