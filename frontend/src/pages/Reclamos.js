import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '../config';
import '../styles/Reclamo.css';
import { Button, Card, CardContent, Typography } from '@mui/material';

const Reclamos = () => {
  const [reclamos, setReclamos] = useState([]);
  const [selectedReclamo, setSelectedReclamo] = useState({});
  useEffect(() => {
    const fetchReclamos = async () => {
      try {
        const response = await fetch(`${API_URL}/reclamos`);
        const data = await response.json();
        setReclamos(data);        
      } catch (error) {
        console.error('Error fetching reclamos data:', error);
      }
    };

    fetchReclamos();
  }, []);

  const getColorByEstado = (is_resuelto) => {
    return is_resuelto ? 'green' : 'red';
  };

  const handleReclamoClick = (reclamo) => {
    setSelectedReclamo(reclamo);
  };

  return (
    <div className="contenedor-reclamos">
      <h1>Reclamos</h1>
      {reclamos.map((reclamo) => (
        <Card key={reclamo.id_reclamo} className="reclamo-card" onClick={() => handleReclamoClick(reclamo)}>
          <CardContent>
            <Typography variant="h6">Reclamo ID: {reclamo.id_reclamo}</Typography>
            <Typography>Codigo Alumno asociado: {reclamo.estudiante_codigo}</Typography>
            <Typography style={{ color: getColorByEstado(reclamo.is_resuelto) }}>
              Estado: {reclamo.is_resuelto ? 'Resuelto' : 'No Atentido'}
            </Typography>
            <Typography>Descripción: {reclamo.descripcion}</Typography>
            <Typography>Respuesta: {reclamo.respuesta}</Typography>            
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
