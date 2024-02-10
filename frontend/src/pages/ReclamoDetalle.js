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
  const [loading, setLoading] = useState(true);
  const [respuesta, setRespuesta] = useState('');  
  const [mostrarCajaRespuesta, setMostrarCajaRespuesta] = useState(false);
  const [mostrarCajaEdicion, setMostrarCajaEdicion] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Establecer loading a true antes de iniciar la carga de datos  
        const reclamoResponse = await fetch(`${API_URL}/reclamos/${id}`);
        const reclamoData = await reclamoResponse.json();
        setReclamo(reclamoData);  
        if (reclamoData.is_resuelto) {
          setMostrarCajaRespuesta(true);
          setRespuesta(reclamoData.respuesta);
        }  
        setEstudianteCodigo(reclamoData.estudiante_codigo);  
        if (reclamoData.estudiante_codigo) {
          const estudianteResponse = await fetch(`${API_URL}/estudiantes/codigo/${reclamoData.estudiante_codigo}`);
          const estudianteData = await estudianteResponse.json();
          setEstudiante(estudianteData);
        }  
        setLoading(false); // Establecer loading a false después de que todas las solicitudes hayan finalizado
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, [id]);
  

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


  if (loading) {
    return <div>Loading...</div>; // Renderizar un indicador de carga mientras se cargan los datos
  }

  if (!reclamo) {
    return <div>No se pudo cargar el reclamo.</div>; // Manejar el caso en el que no se pueda cargar el reclamo
  }
  const formatFecha = (fechaISO) => {
    const date = new Date(fechaISO);    
    return date.toLocaleString();    
  };

  const actualizarReclamo = async () => {
    try {
      const response = await fetch(`${API_URL}/reclamos/actualizar/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          respuesta: respuesta, // Utiliza la respuesta del campo de texto
        }),
      });
  
      if (response.ok) {
        alert('Reclamo actualizado con éxito');
        const reclamoActualizado = await response.json();
        setRespuesta(reclamoActualizado.respuesta);
        setMostrarCajaEdicion(false);
        fetchReclamo();         
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
        fetchReclamo();
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
              <Typography>Fecha de Envio: {formatFecha(reclamo.fecha_ejecucion)}</Typography>
              {reclamo.respuesta && (
                <Typography>Fecha de Respuesta: {formatFecha(reclamo.fecha_respuesta)}</Typography>
              )}
            </>
          )}
          {!reclamo.is_resuelto && (
            <>
              <Button variant="contained" color="primary" onClick={handleResolverReclamo}>
                Resolver Reclamo
              </Button>              
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
          {mostrarCajaRespuesta && reclamo && reclamo.is_resuelto && (
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
