import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { API_URL } from '../config';
import '../styles/ReclamoDetalle.css';
import { Card, CardContent, Typography, Button, TextField } from '@mui/material';

const ReclamoDetalle = () => {
  const { id } = useParams();
  const [reclamo, setReclamo] = useState(null);    
  const [estudianteCodigo, setEstudianteCodigo] = useState(null);
  const [estudiante, setEstudiante] = useState(null);


  const [respuesta, setRespuesta] = useState('');
  const [respuestaEditada, setRespuestaEditada] = useState('');
  const [mostrarCajaRespuesta, setMostrarCajaRespuesta] = useState(false);
  const [mostrarCajaEdicion, setMostrarCajaEdicion] = useState(false);


  useEffect(() => {
    const fetchReclamo = async () => {
      try {
        const response = await fetch(`${API_URL}/reclamos/${id}`);
        const data = await response.json();
        setReclamo(data);        
        if (data.is_resuelto) {
          setMostrarCajaRespuesta(true);
          setRespuesta(data.respuesta);
        }

        setEstudianteCodigo(data.estudiante_codigo);
      } catch (error) {
        console.error('Error fetching reclamo data:', error);
      }
    };

    fetchReclamo();
  }, [id]);

  useEffect(() => {    
    if (estudianteCodigo) {
      const fetchEstudiante = async () => {
        try {
          const responseEstudiante = await fetch(`${API_URL}/estudiantes/codigo/${estudianteCodigo}`);
          const dataEstudiante = await responseEstudiante.json();
          setEstudiante(dataEstudiante);
        } catch (error) {
          console.error('Error fetching estudiante data:', error);
        }
      };

      fetchEstudiante();
    }
  }, [estudianteCodigo]);

  const actualizarReclamo = async () => {
    try {
      const nuevaRespuesta = window.prompt('Ingrese la nueva respuesta del reclamo:', respuesta);
      if (nuevaRespuesta === null) {
        // El usuario hizo clic en "Cancelar"
        return;
      }
  
      const response = await fetch(`${API_URL}/reclamos/actualizar/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          respuesta: nuevaRespuesta,
        }),
      });
  
      if (response.ok) {
        alert('Reclamo actualizado con éxito');
        const reclamoActualizado = await response.json();
        setRespuesta(reclamoActualizado.respuesta);
        setMostrarCajaEdicion(false);
        window.location.reload();
      } else {
        console.error('Error al actualizar el reclamo:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error al actualizar el reclamo:', error);
    }
  };
  

  const handleResolverReclamo = () => {
    setMostrarCajaRespuesta(true);
  };

  const handleEnviarRespuesta = async () => {
    try {
      if (reclamo.is_resuelto) {
        console.log('No se puede enviar respuesta. El reclamo ya está resuelto.');
        return;
      }

      const response = await fetch(`${API_URL}/reclamos/resolver/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          respuesta: respuesta,
        }),
      });

      if (response.ok) {
        alert('Reclamo resuelto con éxito');        
        setRespuesta(respuesta);
        window.location.reload();
      } else {
        console.error('Error al resolver el reclamo:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error al resolver el reclamo:', error);
    }
  };

  if (!reclamo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="contenedor-reclamo-detalle">
      <h1>Detalles del Reclamo</h1>
      <Card className="reclamo-card">
        <CardContent>
          <Typography variant="h6">Reclamo ID: {reclamo._id}</Typography>
          <Typography>Estado: {reclamo.is_resuelto ? 'Resuelto' : 'No resuelto'}</Typography>
          <Typography>Descripción: {reclamo.descripcion}</Typography>
          {estudiante && (
            <>
              <Typography>Nombre Estudiante: {estudiante.nombre} {estudiante.apellido_pat} {estudiante.apellido_mat}</Typography>
              <Typography>Correo Estudiante: {estudiante.email}</Typography>
            </>
          )}
          {!reclamo.is_resuelto && (
            <>
              <Button variant="contained" color="primary" onClick={handleResolverReclamo}>
                Resolver Reclamo
              </Button>

              {/* Nueva caja para enviar respuesta normal */}
              <TextField
                label="Respuesta Normal"
                multiline
                rows={10}
                value={respuesta}
                onChange={(e) => setRespuesta(e.target.value)}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleEnviarRespuesta}
              >
                Enviar Respuesta Normal
              </Button>
            </>
          )}
          {mostrarCajaRespuesta && reclamo.is_resuelto && (
            <>
              {mostrarCajaEdicion ? (
                <>
                  <TextField
                    label="Editar Respuesta"
                    multiline
                    rows={10}
                    value={respuesta}
                    onChange={(e) => setRespuesta(e.target.value)}
                  />
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => setMostrarCajaEdicion(false)}
                  >
                    Cancelar Edición
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={actualizarReclamo}
                  >
                    Actualizar Respuesta
                  </Button>
                </>
              ) : (
                <>
                  <Typography variant="h6">Respuesta: {respuesta}</Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setMostrarCajaEdicion(true)}
                  >
                    Editar Respuesta
                  </Button>
                </>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
  
  
};

export default ReclamoDetalle;
