import React, { useState, useEffect } from 'react';
import { API_URL } from '../config.js';
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import '../styles/Asignaturas.css'; // Asegúrate de tener este archivo importado si contiene estilos adicionales



const Asignaturas = () => {
    const [estudiantes, setEstudiantes] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedStudent, setSelectedStudent] = useState(null);
  
    useEffect(() => {
      const fetchEstudiantes = async () => {
        try {
          const response = await fetch(`${API_URL}/estudiantes`);
          const data = await response.json();
          setEstudiantes(data);
        } catch (error) {
          console.error('Error fetching estudiantes data:', error);
        }
      };
  
      fetchEstudiantes();
    }, []);
  
    const handleOpenMenu = (event, student) => {
      setAnchorEl(event.currentTarget);
      setSelectedStudent(student);
    };
  
    const handleCloseMenu = () => {
      setAnchorEl(null);
    };
  
    const handleCalificar = () => {
      // Lógica para la acción de calificar aquí
      console.log(`Calificar a ${selectedStudent.nombre}`);
      handleCloseMenu();
    };
  
    const handleEditarNotas = () => {        
        console.log('Editar notas del estudiante:', selectedStudent);
    }
  
    return (
        <div className="contenedor-alumnos">
          <h1>Asignaturas</h1>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Código</TableCell>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Apellido Paterno</TableCell>
                  <TableCell>Apellido Materno</TableCell>
                  <TableCell>Teléfono</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Delegado</TableCell>
                  <TableCell>Nota EC</TableCell>
                  <TableCell>Nota EF</TableCell>
                  <TableCell>Nota EP</TableCell>
                  <TableCell>Promedio</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {estudiantes.map((estudiante) => (
                  <TableRow key={estudiante.codigo}>
                    <TableCell>{estudiante.codigo}</TableCell>
                    <TableCell>{estudiante.nombre}</TableCell>
                    <TableCell>{estudiante.apellido_pat}</TableCell>
                    <TableCell>{estudiante.apellido_mat}</TableCell>
                    <TableCell>{estudiante.telefono}</TableCell>
                    <TableCell>{estudiante.email}</TableCell>
                    <TableCell>{estudiante.isDelegado ? 'Sí' : 'No'}</TableCell>
                    <TableCell>{estudiante.nota_ec}</TableCell>
                    <TableCell>{estudiante.nota_ef}</TableCell>
                    <TableCell>{estudiante.nota_ep}</TableCell>
                    <TableCell>{estudiante.promedio}</TableCell>
                    <TableCell>
                    <IconButton
                        size="small"
                        aria-controls="actions-menu"
                        aria-haspopup="true"
                        onClick={(e) => handleOpenMenu(e, estudiante)}
                    >
                        <MoreVertIcon />
                    </IconButton>
                    <Menu
                        id="actions-menu"
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleCloseMenu}
                    >
                        <MenuItem onClick={handleCalificar}>Calificar</MenuItem>
                        <MenuItem onClick={handleEditarNotas}>Editar Notas</MenuItem>
                    </Menu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>          
        </div>
      );
      
  };  
  
export default Asignaturas;
