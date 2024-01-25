import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Outlet, Navigate } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/Sidebar";
import EstudianteMain from "./pages/Menu-Est.js";
import ProfesorMain from "./pages/Prof-Menu.js";
import { Helmet } from "react-helmet";
import Login from "./pages/Login.js";
import LoginEst from "./pages/EstLogin.js";
import LoginProf from "./pages/ProfLogin.js";
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
  const [userType, setUserType] = useState('');
  const [user, setUser] = useState({})

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = localStorage.getItem('token');
        const storedUserType = localStorage.getItem('userType');

        if (token && storedUserType) {
          setIsLoggedIn(true);
          setUserType(storedUserType);
        } else {
          setIsLoggedIn(false);
          setUserType('');
        }
      } catch (error) {
        console.error('Error checking login status', error);
        setIsLoggedIn(false);
        setUserType('');
      } finally {
        setLoading(false);
      }
    };

    checkLoginStatus();
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, userType, setUserType, setUser }}>
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
                  userType === 'profesor' ? (
                    <Navigate to="/ProfesorMain" />
                  ) : (
                    <Navigate to="/EstudianteMain" />
                  )
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            {isLoggedIn && (
              <Route path="/" element={<Sidebar userType={userType} />} >
                {userType === 'profesor' && (
                  <Route path="/ProfesorMain" element={<ProfesorMain />} />
                )}
                {userType === 'estudiante' && (
                  <Route path="/EstudianteMain" element={<EstudianteMain />} />
                )}
                <Route path="/Editar" element={<Editar />} />
                <Route path="/ReporteEvaluaciones" element={<ReporteEvaluaciones />} />
                <Route path="/Reclamo" element={<Reclamo />} />
                <Route path="*" element={<Navigate to={userType === 'profesor' ? "/ProfesorMain" : "/EstudianteMain"} />} />
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