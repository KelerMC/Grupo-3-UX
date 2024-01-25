import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/Sidebar";
import EstudianteMain from "./pages/EstudianteMain.js";
import MainProfesor from "./pages/MainProfesor.js";
import { Helmet } from "react-helmet";
import Login from "./pages/Login.js";
import LoginEst from "./pages/EstLogin.js";
import LoginProf from "./pages/ProfLogin.js";
import Editar from "./pages/Editar.js";
import ReporteEvaluaciones from "./pages/ReporteEvaluaciones.js";
import Reclamo from "./pages/Reclamos.js";

function App() {
  return (
    <div className="App">
      <Router>
        <Helmet>
          <title>Sistema Evaluaciones</title>
        </Helmet>

        <Sidebar />

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login-profesor" element={<LoginProf />} />
          <Route path="/login-estudiante" element={<LoginEst />} />            
          <Route path="/EstudianteMain" element={<EstudianteMain />} />
          <Route path="/ProfesorMain" element={<MainProfesor />} />
          <Route path="/Editar" element={<Editar />} />
          <Route path="/ReporteEvaluaciones" element={<ReporteEvaluaciones />} />
          <Route path="/Reclamo" element={<Reclamo />} />
        </Routes>
      </Router>
    </div>    
  );  
}

export default App;
