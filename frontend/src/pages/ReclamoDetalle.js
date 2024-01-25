import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { API_URL } from '../config'; // Asegúrate de importar la URL correcta
import '../styles/ReclamoDetalle.css'; // Importa el archivo CSS
import { Card, CardContent, Typography, Button } from '@mui/material';

const ReclamoDetalle = () => {
  const { id } = useParams();
  const [reclamo, setReclamo] = useState(null);

  useEffect(() => {
    const fetchReclamo = async () => {
      try {
        const response = await fetch(`${API_URL}/reclamos/${id}`);
        const data = await response.json();
        setReclamo(data);
      } catch (error) {
        console.error('Error fetching reclamo data:', error);
      }
    };

    fetchReclamo();
  }, [id]);

  if (!reclamo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="contenedor-reclamo-detalle">
      <h1>Detalles del Reclamo</h1>
      <Card className="reclamo-card">
        <CardContent>
          <Typography variant="h6">Reclamo ID: {reclamo._id}</Typography>
          <Typography>Email asociado: {reclamo.email_asociado}</Typography>
          <Typography>Estado: {reclamo.isResuelto ? 'Resuelto' : 'No resuelto'}</Typography>
          <Typography>Descripción: {reclamo.descripcion}</Typography>
          <Button variant="contained" color="primary" onClick={() => {/* Agregar lógica para resolver el reclamo */}}>
            Resolver Reclamo
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReclamoDetalle;
