// src/main.jsx (MODIFICAR ESTE ARCHIVO)
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { ProveedorAutenticacion } from './context/ContextoAutenticacion.jsx'; // 👈 Nombre nuevo

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ProveedorAutenticacion>
      <App />
    </ProveedorAutenticacion>
  </React.StrictMode>,
);