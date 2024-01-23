import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Outlet, Navigate } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Main from "./pages/Main";
import { Helmet } from "react-helmet";
import Login from "./pages/Login.js";
import LoginEst from "./pages/LoginEst.js";
import LoginProf from "./pages/LoginEst.js";
import Editar from "./pages/Editar.js";
import ReporteEvaluaciones from "./pages/ReporteEvaluaciones.js";
import Reclamo from "./pages/Reclamos.js";
import AccesoDenegado from "./pages/AccesoDenegado.js";

export const AuthContext = React.createContext();

const SidebarLayout = () => (
  <>
    <Sidebar />
    <Outlet />
  </>
);


function App() {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          // Verificar si el token es válido (puedes hacer una llamada al servidor aquí)
          // Si es válido, establecer el estado como autenticado
          setIsLoggedIn(true);
        } else {
          // Si no hay token, o es inválido, establecer el estado como no autenticado
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Error checking login status', error);
        // En caso de error, también establecer el estado como no autenticado
        setIsLoggedIn(false);
      } finally {
        // Independientemente del resultado, marcar la carga como completa
        setLoading(false);
      }
    };
  
    checkLoginStatus();
  }, []);
  


  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <div className="App">
      <Router>
        <Helmet>
          <title>Sistema Evaluaciones</title>
        </Helmet>
        <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login-profesor" element={<LoginProf />} />
        <Route path="/login-estudiante" element={<LoginEst />} />
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <Navigate to="/Main" />
              ) : (
                <Login setIsLoggedIn={setIsLoggedIn} />
              )
            }
          />
          {isLoggedIn && (
            <Route path="/" element={<SidebarLayout />}>
              <Route path="/Main" element={<Main />} />
              <Route path="/Editar" element={<Editar />} />
              <Route path="/ReporteEvaluaciones" element={<ReporteEvaluaciones />} />              
              <Route path="/Reclamo" element={<Reclamo />} />              
              <Route path="*" element={<Navigate to="/Main" />} />              
            </Route>
          )}
          {!isLoggedIn && (
            <Route path="*" element={<AccesoDenegado />} />
          )}
        </Routes>
      </Router>
      </div>
      </AuthContext.Provider>
  );
}

export default App;