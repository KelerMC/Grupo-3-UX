import React, { useState, useEffect } from 'react';
import { API_URL } from '../config';
import '../styles/MisReclamos.css';
import axios from 'axios';
import { Button, Card, CardContent, Typography, FormControl, InputLabel, Select, MenuItem, Modal,TextField } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';

const MisReclamos = () => {
  const email = localStorage.getItem('correo');
  const [estudiante, setEstudiante] = useState(null);
  const [codigoEstudiante, setCodigoEstudiante] = useState(null);
  const [reclamos, setReclamos] = useState([]);
  const [error, setError] = useState(null);
  const [reclamo, setReclamo] = useState('');
  const [mostrarCajaReclamo, setMostrarCajaReclamo] = useState(false);
  const [profesorSeleccionado, setProfesorSeleccionado] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [profesores, setProfesores] = useState([]);
  const [filtroEstado, setFiltroEstado] = useState('todos');
  const [ordenacion, setOrdenacion] = useState('nuevosPrimero');

  const fetchProfesores = async () => {
    try {
      const response = await axios.get(`${API_URL}/profesores`);
      setProfesores(response.data);
    } catch (error) {
      console.error('Error fetching profesores data:', error);
    }
  };

  const fetchData = async () => {
    try {
      const correo = localStorage.getItem('correo');
      const response = await axios.get(`${API_URL}/estudiantes/${correo}`);
      setEstudiante(response.data);
      setCodigoEstudiante(response.data.codigo);
    } catch (error) {
      setError('Error al obtener datos del estudiante');
      console.error(error);
    }
  };

  const fetchReclamos = async () => {
    try {
      const response = await fetch(`${API_URL}/reclamos/codigo/${codigoEstudiante}`);
      const data = await response.json();
      setReclamos(data);
    } catch (error) {
      console.error('Error fetching reclamos data:', error);
    }
  };

  useEffect(() => {
    fetchProfesores();
    fetchData();
  }, []);

  useEffect(() => {
    if (codigoEstudiante) {
      fetchReclamos();
    }
  }, [codigoEstudiante]);

  // Nuevo useEffect para actualizar la información del estudiante y la fecha
  useEffect(() => {
    // Verificar que haya reclamos y que el estudiante esté disponible
    if (reclamos.length > 0 && estudiante !== null) {
      // Realizar acciones que dependen de la disponibilidad de reclamos y estudiante
      console.log('Reclamos cargados:', reclamos);
      console.log('Estudiante cargado:', estudiante);
    }
  }, [reclamos, estudiante]);

  const handlePresentarReclamo = () => {
    setMostrarModal(true);
    setMostrarCajaReclamo(true);
  };

  const handleEnviarReclamo = async () => {
    if (profesorSeleccionado === null) {
      alert('Selecciona un profesor antes de enviar el reclamo');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/reclamos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          estudiante_codigo: codigoEstudiante,
          descripcion: reclamo,
          dni_profesor: profesorSeleccionado,
        }),
      });

      if (response.ok) {
        alert('Reclamo enviado con éxito');
        setMostrarModal(false);
      } else {
        alert('Error al enviar el reclamo:', response.status, response.statusText);
      }
    } catch (error) {
      alert('Error al enviar el reclamo:', error);
    }
    fetchReclamos();
  };

  const formatFecha = (fechaISO) => {
    const date = new Date(fechaISO);    
    return date.toLocaleString();    
  };

  const reclamosOrdenados = reclamos.slice().sort((a, b) => {
    if (ordenacion === 'nuevosPrimero') {
      return new Date(b.fecha_ejecucion) - new Date(a.fecha_ejecucion);
    } else {
      return new Date(a.fecha_ejecucion) - new Date(b.fecha_ejecucion);
    }
  });

  const handleFiltroChange = (event) => {
    setFiltroEstado(event.target.value);
  };

  const handleOrdenacionChange = (event) => {
    setOrdenacion(event.target.value);
  };

  const reclamosFiltrados = reclamosOrdenados.filter((reclamo) => {
    if (filtroEstado === 'todos') {
      return true;
    } else if (filtroEstado === 'resueltos') {
      return reclamo.is_resuelto;
    } else {
      return !reclamo.is_resuelto;
    }
  });

  return (
    <div className="contenedor-mis-reclamos container mt-4 d-flex justify-content-center align-items-center">
      <div className="w-75">
        <h1 className="titulo-mis-reclamos mb-4">Mis Reclamos</h1>
        <FormControl variant="outlined" className="mb-3">
          <InputLabel id="filtro-reclamos-label">Filtrar por estado</InputLabel>
          <Select
            labelId="filtro-reclamos-label"
            id="filtro-reclamos"
            value={filtroEstado}
            onChange={handleFiltroChange}
            label="Filtrar por estado"
          >
            <MenuItem value="todos">Todos</MenuItem>
            <MenuItem value="resueltos">Resueltos</MenuItem>
            <MenuItem value="no-resueltos">No Resueltos</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="outlined">
        <InputLabel id="ordenacion-reclamos-label">Ordenar por fecha</InputLabel>
        <Select
          labelId="ordenacion-reclamos-label"
          id="ordenacion-reclamos"
          value={ordenacion}
          onChange={handleOrdenacionChange}
          label="Ordenar por fecha"
        >
          <MenuItem value="nuevosPrimero">Más nuevos primero</MenuItem>
          <MenuItem value="viejosPrimero">Más viejos primero</MenuItem>
        </Select>
      </FormControl>

        <Button variant="contained" color="primary" onClick={handlePresentarReclamo} className="mb-3">
          Presentar Reclamo
        </Button>

        {Array.isArray(reclamosFiltrados) &&
        reclamosFiltrados.map((reclamo) => (
          <Card
            key={reclamo._id}
            className={`reclamo-card mb-3 ${reclamo.is_resuelto ? 'resuelto' : 'no-resuelto'}`}
          >
            <CardContent>
              <Typography variant="h6">
                Estado del Reclamo: {reclamo.is_resuelto ? 'Resuelto' : 'No resuelto'}
              </Typography>
              <Typography>Fecha de Envio: {formatFecha(reclamo.fecha_ejecucion)}</Typography>
              <Typography>Descripción: {reclamo.descripcion}</Typography>
              <Typography>Respuesta del Profesor: {reclamo.respuesta || 'Sin respuesta'}</Typography>
              {reclamo.respuesta && (
                <Typography>Fecha de Respuesta: {formatFecha(reclamo.fecha_respuesta)}</Typography>
              )}
            </CardContent>
          </Card>
        ))}
        {mostrarModal && (
          <Modal
            open={mostrarModal}
            onClose={() => setMostrarModal(false)}
            aria-labelledby="selector-profesores-modal"
            aria-describedby="selecciona-un-profesor"
          >
            <div className="modal-container">
              <div className="modal-content">
                <h2 id="selector-profesores-modal">Selecciona un profesor</h2>
                <select
                  value={profesorSeleccionado}
                  onChange={(e) => setProfesorSeleccionado(e.target.value)}
                  className="form-select mb-3"
                >
                  <option value="" disabled selected hidden>
                    Selecciona un profesor
                  </option>
                  {profesores.map((profesor) => (
                    <option key={profesor.id} value={profesor.dni}>
                      {profesor.nombre} {profesor.apellido_pat} {profesor.apellido_mat}
                    </option>
                  ))}
                </select>
                {mostrarCajaReclamo && (
                  <div className="reclamo-container">
                    <TextField
                      label="Descripción del Reclamo"
                      multiline
                      rows={4}
                      value={reclamo}
                      onChange={(e) => setReclamo(e.target.value)}
                      className="mb-3 form-control"
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleEnviarReclamo}
                      className="btn btn-primary"
                    >
                      Enviar Reclamo
                    </Button>
                  </div>
                )}

                {profesorSeleccionado !== '' ? null : (
                  <div className="error-message">Selecciona un profesor antes de enviar el reclamo</div>
                )}
              </div>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default MisReclamos;
