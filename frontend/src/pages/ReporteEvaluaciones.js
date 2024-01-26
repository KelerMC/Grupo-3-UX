// ReporteEvaluaciones.js

import React, { useState, useEffect } from 'react';
import { API_URL } from '../config';
import { Card, CardContent, Typography, Button } from '@mui/material';
import '../styles/ReporteEvaluaciones.css'; // Asegúrate de importar el archivo CSS

const ReporteEvaluaciones = () => {
  const email = localStorage.getItem('correo');

  const [alumno, setAlumno] = useState({
    codigo: '',
    nombre: '',
    apellido_pat: '',
    apellido_mat: '',
    telefono: '',
    email: '',
    isDelegado: false,
    nota_ec: 0,
    nota_ef: 0,
    nota_ep: 0,
    promedio: 0,
  });

  useEffect(() => {
    const fetchAlumno = async () => {
      try {
        const response = await fetch(`${API_URL}/estudiantes/${email}`);
        const data = await response.json();
        setAlumno(data);
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };

    fetchAlumno();
  }, [email]);

  const handlePresentarReclamo = () => {
    // Lógica para presentar un reclamo
    // Puedes redirigir al usuario a la página de presentación de reclamos o mostrar un formulario modal
    console.log('Reclamo presentado');
  };

  return (
    <div className="contenedor-notas">
      <h1>Reporte de Evaluaciones</h1>
      <Card className="notas-card">
        <CardContent>
          <Typography variant="h6">Notas de {alumno.nombre} {alumno.apellido_pat}</Typography>
          <Typography>Código: {alumno.codigo}</Typography>
          <Typography>Nota de Evaluación Continua (EC): {alumno.nota_ec}</Typography>
          <Typography>Nota de Examen Final (EF): {alumno.nota_ef}</Typography>
          <Typography>Nota de Examen Parcial (EP): {alumno.nota_ep}</Typography>
          <Typography>Promedio: {alumno.promedio}</Typography>
          <Button variant="contained" color="primary" onClick={handlePresentarReclamo}>
            Presentar Reclamo
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReporteEvaluaciones;
