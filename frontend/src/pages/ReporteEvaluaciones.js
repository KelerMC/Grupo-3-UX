import React, { useState, useEffect } from 'react';
import { API_URL } from '../config';
import { Card, CardContent, Typography, Button, TextField, Select, MenuItem } from '@mui/material';
import '../styles/ReporteEvaluaciones.css';

const ReporteEvaluaciones = () => {
  const email = localStorage.getItem('correo');
  const [selectedCursoId, setSelectedCursoId] = useState(null);
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

  const [reclamo, setReclamo] = useState('');
  const [mostrarCajaReclamo, setMostrarCajaReclamo] = useState(false);

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


  const [cursos, setCursos] = useState([]);
  const [notasCurso, setNotasCurso] = useState(null);

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const response = await fetch(`${API_URL}/cursos`);
        const data = await response.json();
        setCursos(data);
      } catch (error) {
        console.error('Error fetching cursos:', error);
      }
    };

    fetchCursos();
  }, []);

  useEffect(() => {
    const fetchNotasCurso = async () => {
      if (selectedCursoId) {
        try {
          const response = await fetch(`${API_URL}/estudiantes/${alumno.codigo}/notas/${selectedCursoId}`);
          const data = await response.json();
          setNotasCurso(data);
        } catch (error) {
          console.error('Error fetching student notes for course:', error);
        }
      } else {
        setNotasCurso(null);
      }
    };

    fetchNotasCurso();
  }, [selectedCursoId, alumno.codigo]);

  return (
    <div className="contenedor-notas">
      <h1>Reporte de Evaluaciones</h1>
      <Card className="notas-card">
        <CardContent>
          <Select
            label="Seleccionar Curso"
            value={selectedCursoId}
            onChange={(e) => setSelectedCursoId(e.target.value)}
          >
            <MenuItem value={null} disabled>
              Seleccionar Curso
            </MenuItem>
            {cursos.map((curso) => (
              <MenuItem key={curso.id_curso} value={curso.id_curso}>
                {curso.nombre}
              </MenuItem>
            ))}
          </Select>
          {notasCurso ? (
            <div>
              <Typography variant="h6">Notas de {alumno.nombre} {alumno.apellido_pat} para el curso seleccionado</Typography>
              <Typography>Nota de Evaluación Continua (EC): {notasCurso.nota_ec}</Typography>
              <Typography>Nota de Examen Final (EF): {notasCurso.nota_ef}</Typography>
              <Typography>Nota de Examen Parcial (EP): {notasCurso.nota_ep}</Typography>
              <Typography>Promedio: {notasCurso.promedio}</Typography>
            </div>
          ) : (
            <Typography>Selecciona un curso para ver las notas.</Typography>
          )}          
        </CardContent>
      </Card>
    </div>
  );
};

export default ReporteEvaluaciones;
