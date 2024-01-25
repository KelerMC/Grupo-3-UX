import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../img/logo.png';

export default function Login() {

  return (
    
    <div className="fondo-pantalla"> 
    <div className="logo">
    <img src={logo} alt="logo" />
    </div>
    
      <div className="contenedor-principal">
      <div className="titulo-LoginPrincipal">
      <h1>Bienvenido al Sistema de la Universidad</h1>
      </div>
    </div>
      
      
      <div className="contenedor-profesor">
        <div className="titulo-profesores">
          <h2>Profesores</h2>
          <Link to="/login-profesor">
          <button>Iniciar Sesión</button>
        </Link>
        </div>
        
        
      </div>

      <div className="contenedor-estudiante">
      <div className="titulo-estudiante">
          <h2>Estudiantes</h2>
          <Link to="/login-estudiante">
          <button>Iniciar Sesión</button>
        </Link>
        </div>
      </div>

      {/* Puedes agregar más elementos o estilos según tus necesidades */}
    </div>
  );
}
