import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '../config';
import '../styles/Reclamo.css';
import { Button, Card, CardContent, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const Reclamos = () => {
  const [reclamos, setReclamos] = useState([]);
  const [selectedReclamo, setSelectedReclamo] = useState({});
  const [filtroEstado, setFiltroEstado] = useState('todos');
  const [ordenacion, setOrdenacion] = useState('nuevosPrimero');

  const ordenarReclamosPorFecha = (reclamosData, orden) => {
    if (orden === 'nuevosPrimero') {
      return reclamosData.sort((a, b) => new Date(b.fecha_ejecucion) - new Date(a.fecha_ejecucion));
    } else {
      return reclamosData.sort((a, b) => new Date(a.fecha_ejecucion) - new Date(b.fecha_ejecucion));
    }
  };

  useEffect(() => {
    const fetchReclamos = async () => {
      try {
        const response = await fetch(`${API_URL}/reclamos`);
        const data = await response.json();
        const reclamosOrdenados = ordenarReclamosPorFecha(data, ordenacion);
        setReclamos(reclamosOrdenados);        
      } catch (error) {
        console.error('Error fetching reclamos data:', error);
      }
    };

    fetchReclamos();
  }, [ordenacion]);

  const getColorByEstado = (is_resuelto) => {
    return is_resuelto ? 'green' : 'red';
  };

  const handleReclamoClick = (reclamo) => {
    setSelectedReclamo(reclamo);
  };

  const handleFiltroChange = (event) => {
    setFiltroEstado(event.target.value);
  };

  const handleOrdenacionChange = (event) => {
    setOrdenacion(event.target.value);
  };

  const reclamosFiltrados = reclamos.filter((reclamo) => {
    if (filtroEstado === 'todos') {
      return true;
    } else if (filtroEstado === 'resueltos') {
      return reclamo.is_resuelto;
    } else {
      return !reclamo.is_resuelto;
    }
  });

  return (
    <div className="contenedor-reclamos">
      <h1>Reclamos</h1>
      <FormControl variant="outlined">
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
      {reclamosFiltrados.map((reclamo) => (
        <Card key={reclamo.id_reclamo} className="reclamo-card" onClick={() => handleReclamoClick(reclamo)}>
          <CardContent>
            <Typography variant="h6">Reclamo ID: {reclamo.id_reclamo}</Typography>
            <Typography>Codigo Alumno asociado: {reclamo.estudiante_codigo}</Typography>
            <Typography style={{ color: getColorByEstado(reclamo.is_resuelto) }}>
              Estado: {reclamo.is_resuelto ? 'Resuelto' : 'No Atendido'}
            </Typography>
            <Typography>Descripción: {reclamo.descripcion}</Typography>
            <Typography>Fecha de Envío: {new Date(reclamo.fecha_ejecucion).toLocaleString()}</Typography>
            <Typography>Respuesta: {reclamo.respuesta}</Typography>
            {reclamo.respuesta && (
              <Typography>Fecha de Respuesta: {new Date(reclamo.fecha_respuesta).toLocaleString()}</Typography>
            )}
            <Link to={`/Reclamos/${reclamo.id_reclamo}`}>
              <Button variant="contained" color="primary">
                Ver Detalles
              </Button>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Reclamos;
