

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/ContextoAutenticacion'; // Usamos useAuth

const RutaPrivada = ({ children }) => {
  const { estaLogueado } = useAuth();
  
  if (!estaLogueado) {
    return <Navigate to="/iniciar-sesion" replace />;
  }

  return children;
};

export default RutaPrivada;