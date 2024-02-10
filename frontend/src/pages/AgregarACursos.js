import React, { useState, useEffect } from 'react';
import { API_URL } from '../config';
import { Modal, Button as Boton, Form } from 'react-bootstrap';
import axios from 'axios';
import '../styles/EditarDele.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const AgregarACursos = () => {
  const [edicionHabilitada, setEdicionHabilitada] = useState(false);
  const [showModal, setShowModal] = useState(true);
  const [codigoEst, setCodigoEst] = useState('');
  const [estudiante, setEstudiante] = useState({
    codigo: '',
    nombre: '',
    apellido_pat: '',
    apellido_mat: '',
    telefono: '',
    email: '',
    isDelegado: false,
  });
  const [cursos, setCursos] = useState([]);
  const [cursosSeleccionados, setCursosSeleccionados] = useState([]);

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const response = await axios.get(`${API_URL}/cursos`);
        const cursosData = response.data;
        setCursos(cursosData);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCursos();
  }, []);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`${API_URL}/estudiantes/cod/${codigoEst}`);
      const estudianteEncontrado = response.data;
      setShowModal(false);
      setEdicionHabilitada(true);
      setEstudiante(estudianteEncontrado);
    } catch (error) {
      console.error('Error searching for student:', error);
    }
  };

  const handleCursoChange = (cursoCodigo) => {
    const isSelected = cursosSeleccionados.includes(cursoCodigo);

    if (isSelected) {
      // Si el curso ya estaba seleccionado, quítalo de la lista
      setCursosSeleccionados(cursosSeleccionados.filter((codigo) => codigo !== cursoCodigo));
    } else {
      // Si el curso no estaba seleccionado, agrégalo a la lista
      setCursosSeleccionados([...cursosSeleccionados, cursoCodigo]);
    }
  };

  const handleMatricular = async () => {
    try {
      if (cursosSeleccionados.length === 0) {
        alert('Por favor, seleccione al menos un curso antes de matricular al estudiante.');
        return;
      }

      // Resto del código para matricular al estudiante en los cursos seleccionados
      // ...

      alert('Estudiante matriculado correctamente en los cursos seleccionados.');
    } catch (error) {
      console.error('Error matriculating student:', error);
    }
  };

  return (
    <div className="contenedor-editar">
      <Modal show={showModal} backdrop="static" centered>
        <Modal.Header closeButton>
          <Modal.Title>Buscar Estudiante</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="codigoAlumno">
              <Form.Label>Digite el código de Alumno a editar</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el código"
                value={codigoEst}
                onChange={(e) => setCodigoEst(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Boton variant="secondary" onClick={() => setShowModal(false)}>
            Cerrar
          </Boton>
          <Boton variant="primary" onClick={handleSearch}>
            Buscar
          </Boton>
        </Modal.Footer>
      </Modal>
      <h2>Matricular al alumno: {estudiante.nombre} </h2>
      {edicionHabilitada && (
        <>
          <Form.Group controlId="cursoSelector">
            <Form.Label>Seleccionar Cursos</Form.Label>
            <div>
              {cursos.map((curso) => (
                <Form.Check
                  key={curso.codigo}
                  type="checkbox"
                  label={curso.nombre}
                  checked={cursosSeleccionados.includes(curso.codigo)}
                  onChange={() => handleCursoChange(curso.codigo)}
                />
              ))}
            </div>
          </Form.Group>
          <Boton variant="primary" onClick={handleMatricular}>
            Matricular en los cursos seleccionados
          </Boton>
        </>
      )}
    </div>
  );
};

export default AgregarACursos;
