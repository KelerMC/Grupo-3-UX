import React, { useState, useEffect } from 'react';
import { API_URL } from '../config.js';
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, IconButton, Menu, MenuItem, Modal, Backdrop, Fade, TextField, Button } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import '../styles/Asignaturas.css';

const Asignaturas = () => {
    const [estudiantes, setEstudiantes] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [notaEC, setNotaEC] = useState('');
    const [notaEF, setNotaEF] = useState('');
    const [notaEP, setNotaEP] = useState('');
    const [modoEdicion, setModoEdicion] = useState(false);
    const [edicionHabilitada, setEdicionHabilitada] = useState(false);
    const [campoActual, setCampoActual] = useState('');
    const [currentRowIndex, setCurrentRowIndex] = useState(-1);
    const [reconocimientoActivo, setReconocimientoActivo] = useState(false);
    const [recognition, setRecognition] = useState(null);
    const cursoId = 1;

    useEffect(() => {
        fetchStudentGrades();
    }, []);

    useEffect(() => {
        if (campoActual !== '' && reconocimientoActivo) {
            startContinuousListening(campoActual, currentRowIndex);
        }
    }, [campoActual, currentRowIndex, reconocimientoActivo]);

    const fetchStudentGrades = async () => {
        try {
            const response = await fetch(`${API_URL}/estudiantes`);
            const data = await response.json();
            const estudiantesConNotas = await Promise.all(data.map(async (estudiante) => {
                const notasResponse = await fetch(`${API_URL}/cursosEst/${estudiante.codigo}/${cursoId}`);
                const notasData = await notasResponse.json();
                return { ...estudiante, ...notasData };
            }));
            setEstudiantes(estudiantesConNotas);
        } catch (error) {
            console.error('Error fetching estudiantes data:', error);
        }
    };

    const handleOpenMenu = (event, student) => {
        if (event) {
            setAnchorEl(event.currentTarget);
            setSelectedStudent(student);
            setEdicionHabilitada(false);
            if (student.nota_ec !== null && student.nota_ef !== null && student.nota_ep !== null) {
                setModoEdicion(true);
                setNotaEC(String(student.nota_ec));
                setNotaEF(String(student.nota_ef));
                setNotaEP(String(student.nota_ep));
            } else {
                setModoEdicion(false);
                setNotaEC('');
                setNotaEF('');
                setNotaEP('');
            }
        }
    };

    useEffect(() => {
        if (reconocimientoActivo) {
            startContinuousListening();
        } else {
            stopContinuousListening();
        }
    }, [reconocimientoActivo]);

    const startContinuousListening = () => {
        const recognition = new window.webkitSpeechRecognition();
        recognition.lang = 'es-ES';
        recognition.continuous = true;
    
        recognition.onresult = (event) => {
            let transcript = event.results[0][0].transcript;
            console.log('Transcripción:', transcript);
    
            if (!isNaN(transcript)) {
                const nota = Number(transcript);
                if (nota >= 0 && nota <= 20) {
                    switch (campoActual) {
                        case 'EC':
                            setNotaEC(nota);
                            handleNotaChange('EC', currentRowIndex, nota);
                            console.log('Nota EC:', nota);
                            break;
                        case 'EF':
                            setNotaEF(nota);
                            handleNotaChange('EF', currentRowIndex, nota);
                            console.log('Nota EF:', nota);
                            break;
                        case 'EP':
                            setNotaEP(nota);
                            handleNotaChange('EP', currentRowIndex, nota);
                            console.log('Nota EP:', nota);
                            break;
                    }
                } else {
                    // Si el número está fuera del rango válido, mostrar alerta y limpiar el transcript
                    alert('Por favor, ingrese un número válido para la nota (0 a 20).');
                    transcript = ''; // Establecer el transcript como una cadena vacía
                    console.log('Número fuera del rango válido, limpiando transcript:', transcript);
                    startContinuousListening(); // Reiniciar el reconocimiento de voz
                }
            } else {
                // Si el transcript no es un número, limpiar el transcript
                transcript = ''; // Establecer el transcript como una cadena vacía
                console.log('Transcript no es un número, limpiando transcript:', transcript);
                startContinuousListening(); // Reiniciar el reconocimiento de voz
            }
        };
        recognition.start();
        setRecognition(recognition);
    };
    
    
    const stopContinuousListening = () => {
        if (recognition) {
            recognition.stop();
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
        setReconocimientoActivo(false);
    };

    const handleCalificar = (campo, rowIndex) => {
        setCampoActual(campo);
        setCurrentRowIndex(rowIndex);        
    };

    const [currentEditingRowIndex, setCurrentEditingRowIndex] = useState(null);

    const handleNotaChange = (campo, rowIndex, value) => {
        const nota = parseFloat(value);
    
        if (!isNaN(nota) && nota >= 0 && nota <= 20) {
            const updatedEstudiantes = [...estudiantes];
            updatedEstudiantes[rowIndex][`nota_${campo.toLowerCase()}`] = nota;
            setEstudiantes(updatedEstudiantes);
    
            let nextCampo = campo;
            let nextRowIndex = rowIndex;
    
            switch (campo) {
                case 'EC':
                    nextCampo = 'EF';
                    break;
                case 'EF':
                    nextCampo = 'EP';
                    break;
                case 'EP':
                    nextCampo = 'EC';
                    nextRowIndex += 1;
                    break;
            }
    
            if (nextRowIndex >= estudiantes.length) {
                nextRowIndex = 0;
                nextCampo = 'EC';
                // Si es el último alumno en la última fila, mostrar un alert de completado                
            }            
            if (nextRowIndex === (estudiantes.length-23)) {
                alert('Proceso de edición de notas completado');
                setCurrentEditingRowIndex(null);
                stopContinuousListening(); 
                setReconocimientoActivo(false);
            } 
            setCurrentRowIndex(nextRowIndex);
            setCampoActual(nextCampo);
    
            // Calcular el promedio actualizado
            const promedio = calculatePromedio(updatedEstudiantes[rowIndex]);
            updatedEstudiantes[rowIndex]['promedio'] = promedio;
            setEstudiantes(updatedEstudiantes);
    
            // Si cambia de fila y no es la primera vez ni la última, enviar las notas al backend
            if (currentEditingRowIndex !== null && currentEditingRowIndex !== nextRowIndex && currentEditingRowIndex !== estudiantes.length - 1) {
                enviarNotasAlBackend(updatedEstudiantes[rowIndex]);
            }
    
            if (currentEditingRowIndex !== nextRowIndex) {
                setCurrentEditingRowIndex(nextRowIndex);
            }
        } else {
            alert('Por favor, ingrese un número válido para la nota (entre 0 y 20).');
        }
    };
        
    const calculatePromedio = (estudiante) => {
        const notas = ['nota_ec', 'nota_ef', 'nota_ep'];
        let suma = 0;
        notas.forEach(nota => {
            suma += parseFloat(estudiante[nota]) || 0;
        });
        return (suma / notas.length).toFixed(2);
    };
    
    const enviarNotasAlBackend = async (estudiante) => {
        try {
            const response = await fetch(`${API_URL}/cursosEst/${estudiante.codigo}/${cursoId}/editar-notas`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nota_ec: parseFloat(estudiante.nota_ec) || 0,
                    nota_ef: parseFloat(estudiante.nota_ef) || 0,
                    nota_ep: parseFloat(estudiante.nota_ep) || 0,
                }),
            });
            if (response.ok) {
                console.log("Notas del estudiante enviadas correctamente al backend.");
            } else {
                console.error('Error al enviar las notas al backend:', response.statusText);
            }
        } catch (error) {
            console.error('Error al enviar las notas al backend:', error);
        }
    };
    
    
    const handleGuardarCalificacion = async () => {
        try {
            if (
                parseFloat(notaEC) >= 0 && parseFloat(notaEC) <= 20 &&
                parseFloat(notaEF) >= 0 && parseFloat(notaEF) <= 20 &&
                parseFloat(notaEP) >= 0 && parseFloat(notaEP) <= 20
            ) {
                console.log('Notas a guardar:', { nota_ec: parseFloat(notaEC), nota_ef: parseFloat(notaEF), nota_ep: parseFloat(notaEP) });
                const response = await fetch(`${API_URL}/cursosEst/${selectedStudent.codigo}/${cursoId}/editar-notas`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        nota_ec: parseFloat(notaEC) || 0,
                        nota_ef: parseFloat(notaEF) || 0,
                        nota_ep: parseFloat(notaEP) || 0,
                    }),
                });
                if (response.ok) {
                    alert("Notas actualizadas correctamente");
                    const nextRowIndex = currentRowIndex + 1;
                    if (nextRowIndex < estudiantes.length) {
                        setCurrentRowIndex(nextRowIndex);
                        setCampoActual('EC');
                    }
                } else {
                    alert('Error al actualizar las notas:', response.statusText);
                }
                fetchStudentGrades();
                handleCloseModal();
            } else {
                alert('Por favor, asegúrese de ingresar notas válidas, el rango válido es de 0 a 20.');
            }
        } catch (error) {
            console.error('Error al guardar o actualizar las notas:', error);
        }
    };
    const handleEditarNotas = () => {
        setEdicionHabilitada(true);
        handleOpenModal();
    };

    const handleStartNotas = () => {
        setCurrentRowIndex(0);
        setCampoActual('EC');
        setReconocimientoActivo(true);
        setCurrentEditingRowIndex(0); 
    };

    return (
        <div className="contenedor-alumnos">
            <h1>Asignaturas</h1>
            <Button variant="contained" onClick={handleStartNotas}>
                Iniciar Establecimiento de Notas
            </Button>
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
                {estudiantes.slice(0, 5).map((estudiante, index) => (
                <TableRow key={estudiante.codigo}>
                    <TableCell>{estudiante.codigo}</TableCell>
                    <TableCell>{estudiante.nombre}</TableCell>
                    <TableCell>{estudiante.apellido_pat}</TableCell>
                    <TableCell>{estudiante.apellido_mat}</TableCell>
                    <TableCell>{estudiante.telefono}</TableCell>
                    <TableCell>{estudiante.email}</TableCell>
                    <TableCell>{estudiante.is_delegado ? 'Sí' : 'No'}</TableCell>
                    <TableCell 
                        className={campoActual === 'EC' && index === currentRowIndex ? 'current-cell' : ''}
                        contentEditable={edicionHabilitada && modoEdicion}
                        onBlur={(e) => handleNotaChange('EC', index, e.target.innerText)}
                    >
                        {estudiante.nota_ec}
                    </TableCell>
                    <TableCell 
                        className={campoActual === 'EF' && index === currentRowIndex ? 'current-cell' : ''}
                        contentEditable={edicionHabilitada && modoEdicion}
                        onBlur={(e) => handleNotaChange('EF', index, e.target.innerText)}
                    >
                        {estudiante.nota_ef}
                    </TableCell>
                    <TableCell 
                        className={campoActual === 'EP' && index === currentRowIndex ? 'current-cell' : ''}
                        contentEditable={edicionHabilitada && modoEdicion}
                        onBlur={(e) => handleNotaChange('EP', index, e.target.innerText)}
                    >
                        {estudiante.nota_ep}
                    </TableCell>
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
                            value={notaEC}
                            onChange={(e) => setNotaEC(e.target.value)}
                            disabled={!edicionHabilitada && modoEdicion}
                            inputProps={{ maxLength: 2 }}
                        />
                        <TextField
                            label="Nota EF"
                            value={notaEF}
                            onChange={(e) => setNotaEF(e.target.value)}
                            disabled={!edicionHabilitada && modoEdicion}
                            inputProps={{ maxLength: 2 }}
                        />
                        <TextField
                            label="Nota EP"
                            value={notaEP}
                            onChange={(e) => setNotaEP(e.target.value)}
                            disabled={!edicionHabilitada && modoEdicion}
                            inputProps={{ maxLength: 2 }}
                        />
                        <Button variant="contained" onClick={handleGuardarCalificacion}>
                            Guardar Calificación
                        </Button>
                        <Button variant="contained" onClick={handleCloseModal}>
                            Cancelar
                        </Button>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
};

export default Asignaturas;
