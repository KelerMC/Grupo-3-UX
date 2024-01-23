import React from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <div>
      {/* Agrega tu contenido, como títulos, descripciones, etc. */}
      <h1>Bienvenido al Sistema de Inicio de Sesión</h1>

      {/* Agrega botones o enlaces para redirigir a los tipos de usuarios específicos */}
      <div className="login-option">
        <h2>Sistema de Profesores</h2>
        <Link to="/login-profesor">
          <button>Iniciar Sesión como Profesor</button>
        </Link>
      </div>

      <div className="login-option">
        <h2>Sistema de Estudiantes</h2>
        <Link to="/login-estudiante">
          <button>Iniciar Sesión como Estudiante</button>
        </Link>
      </div>

      {/* Puedes agregar más elementos o estilos según tus necesidades */}
    </div>
  );
}
