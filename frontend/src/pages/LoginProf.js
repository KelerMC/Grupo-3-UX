import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../App.js'; // Ajusta la ruta según la ubicación real de App.js
import { API_URL } from '../config.js';
import '../styles/Login.css';

export default function Login() {
  const [contrasena, setContrasena] = useState('');
  const [correo, setCorreo] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {    
      const response = await axios.post(`${API_URL}/docentes/login`, { email: correo, password: contrasena });      
      if (response.data.succes === true) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('correo', correo);
        setIsLoggedIn(true);
        navigate('/Main', { replace: true });
      } else {
        setError('Credenciales incorrectas');
      }
    } catch (error) {
      setError('Error en el inicio de sesión');
      console.error(error);
    }
  };  

    return (
        <div>
            <div className="fondo-celeste"></div>
            <div className="login-contenedor">            
            <div className="row justify-content-center">
                <div className="box-contenido">                    
                    <h1 className="titulo-Sistema">Sistema de Docentes</h1>
                    <h1 className="titulo-Iniciar">Iniciar Sesión</h1>
                    
                    <form onSubmit={handleLogin}>
                        <div className="mb-3">
                            <label htmlFor="correo" className="lbl-correo">
                                Correo Electrónico:
                            </label>
                            <input
                                type="email"
                                className="campo-correo"
                                id="correo"
                                value={correo}
                                onChange={(e) => setCorreo(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="contrasena" className="lbl-contrasena">
                                Contraseña:
                            </label>
                            <input
                                type="password"
                                className="campo-contrasena"
                                id="contrasena"
                                value={contrasena}
                                onChange={(e) => setContrasena(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="btn-IniciarSesion">
                            Iniciar Sesión
                        </button>

                        {error && <p className="text-danger">{error}</p>}
                    </form>
                </div>
            </div>
            </div>
        </div>
    );
}
