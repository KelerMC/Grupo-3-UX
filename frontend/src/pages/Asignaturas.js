import React, { useState, useEffect } from 'react';
import { API_URL } from '../config.js';
import {  Table,  TableContainer,  TableHead,  TableRow,  TableCell,  TableBody,  Paper,  IconButton,  Menu,  MenuItem,  Modal,  Backdrop,  Fade,  TextField,   Button,} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import '../styles/Asignaturas.css'; // Asegúrate de tener este archivo importado si contiene estilos adicionales

const Asignaturas = () => {
    const [estudiantes, setEstudiantes] = useState([]);
    const [estudiantesOriginales, setEstudiantesOriginales] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [notaEC, setNotaEC] = useState('');
    const [notaEF, setNotaEF] = useState('');
    const [notaEP, setNotaEP] = useState('');
    const [notasIniciales, setNotasIniciales] = useState(null);
    const [filtroNombre, setFiltroNombre] = useState('');
    const [filtroCodigo, setFiltroCodigo] = useState('')
    const [modoEdicion, setModoEdicion] = useState(false);
    const [edicionHabilitada, setEdicionHabilitada] = useState(false);
    useEffect(() => {
      const fetchEstudiantes = async () => {
        try {
          const response = await fetch(`${API_URL}/estudiantes`);
          const data = await response.json();
          setEstudiantes(data);
          setEstudiantesOriginales(data);
        } catch (error) {
          console.error('Error fetching estudiantes data:', error);
        }
      };
  
      fetchEstudiantes();
    }, []);

    const actualizarDatosEstudiantes = async () => {
      try {
        const response = await fetch(`${API_URL}/estudiantes`);
        const data = await response.json();
        setEstudiantes(data);
        setEstudiantesOriginales(data);
      } catch (error) {
        console.error('Error fetching estudiantes data:', error);
      }
    };

  const handleOpenMenu = (event, student) => {
    if (event) {
      setAnchorEl(event.currentTarget);
      setSelectedStudent(student);
      setEdicionHabilitada(false); // Inicializa el estado de edición al abrir el menú
      if (student.nota_ec !== null && student.nota_ef !== null && student.nota_ep !== null) {
        setModoEdicion(true);
        setNotasIniciales({
          notaEC: parseFloat(student.nota_ec),
          notaEF: parseFloat(student.nota_ef),
          notaEP: parseFloat(student.nota_ep),
        });
        setNotaEC(String(student.nota_ec));
        setNotaEF(String(student.nota_ef));
        setNotaEP(String(student.nota_ep));
      } else {
        setModoEdicion(false);
        setNotasIniciales(null);
        setNotaEC('');
        setNotaEF('');
        setNotaEP('');
      }
    }
  };
  
    const handleCloseMenu = () => {
      setAnchorEl(null);
    };
  
    const handleOpenModal = () => {
      setOpenModal(true);
    };
  
    const handleCloseModal = () => {
      setOpenModal(false);
      setEdicionHabilitada(false);
    };
  
    const handleCalificar = () => {
      handleOpenMenu();
      handleOpenModal();
      setModoEdicion(false);
    };      
    const handleGuardarCalificacion = async () => {
      try {        
        console.log('Calificación guardada:', notaEC, notaEF, notaEP);
        const response = await fetch(`${API_URL}/estudiantes/notas/${selectedStudent.email}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nota_ec: parseFloat(notaEC) || 0,
            nota_ep: parseFloat(notaEP) || 0,
            nota_ef: parseFloat(notaEF) || 0,
          }),
        });    
        if (response.ok) {
          alert("Nota Enviada Correctamente");
          actualizarDatosEstudiantes(); // Actualiza los datos de los estudiantes después de guardar la calificación
        } else {
          alert('Error al enviar las notas:', response.statusText);
        }       
      } catch (error) {
        console.error('Error al enviar las notas:', error);
        // Aquí puedes manejar el error de acuerdo a tus necesidades
      }      
    };    
    
    const handleEditarNotas = () => {
      console.log('Editar notas del estudiante:', selectedStudent);
      if (notasIniciales) {
        setNotaEC(String(notasIniciales.notaEC));
        setNotaEF(String(notasIniciales.notaEF));
        setNotaEP(String(notasIniciales.notaEP));
      } else {
        setNotaEC('');
        setNotaEF('');
        setNotaEP('');
      }
      handleOpenModal();
    };

    const handleSearchNombre = (e) => {
      setFiltroNombre(e.target.value);
      filterStudents(e.target.value, filtroCodigo);
    };
  
    const handleSearchCodigo = (e) => {
      setFiltroCodigo(e.target.value);
      filterStudents(filtroNombre, e.target.value);
    };
  
    const filterStudents = (nombre, codigo) => {
      const estudiantesFiltrados = estudiantesOriginales.filter(
        (estudiante) =>
          estudiante.nombre.toLowerCase().includes(nombre.toLowerCase()) &&
          estudiante.codigo.toLowerCase().includes(codigo.toLowerCase())
      );
      setEstudiantes(estudiantesFiltrados);
    };
  
    return (
        <div className="contenedor-alumnos">
          <h1>Asignaturas</h1>
          <TextField
            label="Buscar por Nombre"
            variant="outlined"
            onChange={handleSearchNombre}
          />
          <TextField
            label="Buscar por Código"
            variant="outlined"
            onChange={handleSearchCodigo}
          />
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
                      elevation={2}
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
          <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openModal}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModal}>
          <div className="modal-paper">
            <h2 id="transition-modal-title">Calificar Estudiante</h2>
            <TextField
                label="Nota EC"
                value={edicionHabilitada ? notaEC : (modoEdicion ? notasIniciales?.notaEC : notaEC)}
                onChange={(e) => setNotaEC(e.target.value)}
                disabled={!edicionHabilitada && modoEdicion} // Deshabilita el campo si no está habilitada la edición y estamos en modo edición
              />
              <TextField
                label="Nota EF"
                value={edicionHabilitada ? notaEF : (modoEdicion ? notasIniciales?.notaEF : notaEF)}
                onChange={(e) => setNotaEF(e.target.value)}
                disabled={!edicionHabilitada && modoEdicion}
              />
              <TextField
                label="Nota EP"
                value={edicionHabilitada ? notaEP : (modoEdicion ? notasIniciales?.notaEP : notaEP)}
                onChange={(e) => setNotaEP(e.target.value)}
                disabled={!edicionHabilitada && modoEdicion}
              />
            <Button variant="contained" onClick={handleGuardarCalificacion}>
              Guardar Calificación
            </Button>
            <Button
              variant="contained"
              onClick={() => setEdicionHabilitada(true)}
            >
              Habilitar Edición
            </Button>
          </div>
        </Fade>
      </Modal>                    
        </div>
      );
      
  };  
  
export default Asignaturas;
