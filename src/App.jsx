

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Encabezado from './components/Common/Encabezado'; // Componente de Cabecera
import InicioSesion from './components/Auth/InicioSesion'; // Pantalla de Login
import Registro from './components/Auth/Registro'; // Pantalla de Registro
import RutaPrivada from './components/Common/RutaPrivada'; // Protección de rutas
import PanelControl from './pages/PanelControl'; // Dashboard

function App() {
  return (
    <Router>
      <Encabezado />
      <div className="main-content">
        <Routes>
          {/* Rutas Públicas */}
          <Route path="/iniciar-sesion" element={<InicioSesion />} />
          <Route path="/registro" element={<Registro />} />
          
          {/* Ruta Raíz */}
          <Route path="/" element={<Navigate to="/panel" replace />} />
          
          {/* Ruta Protegida */}
          <Route 
            path="/panel" 
            element={
              <RutaPrivada>
                <PanelControl />
              </RutaPrivada>
            } 
          />
          
          
          
          {/* Ruta para errores 404 */}
          <Route path="*" element={<h1>404 | Página no encontrada</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;