import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { API_URL } from '../config';
import { Modal, Button as Boton, Form } from 'react-bootstrap';
import axios from 'axios';
import '../styles/EditarDele.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const EditarDele = () => {  
  const [edicionHabilitada, setEdicionHabilitada] = useState(false);    
  const [showModal, setShowModal] = useState(true); // Cambiado de setModalOpen a setShowModal
  const [codigoEst, setCodigoEst] = useState(''); // Cambiado de codigoAlumno a nuevoPropCodigo
  const [estudiante, setEstudiante] = useState({
    codigo: '',
    nombre: '',
    apellido_pat: '',
    apellido_mat: '',
    telefono: '',
    email: '',
    isDelegado: false,
  });

  const handleSearch = async () => {
    try {
      const response = await axios.get(`${API_URL}/estudiantes/cod/${codigoEst}`);
      const estudianteEncontrado = response.data; // asumiendo que el servidor devuelve el estudiante
      setShowModal(false);
      setEdicionHabilitada(true);
      setEstudiante(estudianteEncontrado);
    } catch (error) {
      console.error('Error searching for student:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEstudiante((prevEstudiante) => ({
      ...prevEstudiante,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/estudiantes/${estudiante.email}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(estudiante),
      });
      const data = await response.json();
      alert('Estudiante actualizado:', estudiante.codigo);
    } catch (error) {
      console.error('Error updating student data:', error);
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
      <h2>Editar Datos del Estudiante: {estudiante.nombre} </h2>
      <form onSubmit={handleSubmit}>   
      <label>
          Teléfono:
          <input
            type="text"
            name="telefono"
            value={estudiante.telefono}
            onChange={handleInputChange}            
          />
        </label>             
          <>
            <label>
              Nombre:
              <input
                type="text"
                name="nombre"
                value={estudiante.nombre}
                onChange={handleInputChange}                
              />
            </label>
            <label>
              Apellido Paterno:
              <input
                type="text"
                name="apellido_pat"
                value={estudiante.apellido_pat}
                onChange={handleInputChange}                
              />
            </label>
            <label>
              Apellido Materno:
              <input
                type="text"
                name="apellido_mat"
                value={estudiante.apellido_mat}
                onChange={handleInputChange}                
              />
            </label>
            <label>
              Email:
              <input
                type="text"
                name="email"
                value={estudiante.email}
                onChange={handleInputChange}                
              />
            </label>
          </>        
        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  );
};

export default EditarDele;
