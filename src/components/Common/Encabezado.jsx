// src/components/Common/Encabezado.jsx

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/ContextoAutenticacion';

function Encabezado() {
    const { estaLogueado, usuarioAutenticado, cerrarSesion } = useAuth();
    const navigate = useNavigate();

    const handleCerrarSesion = () => {
        cerrarSesion();
        navigate('/iniciar-sesion');
    };

    return (
        <header style={{ 
            padding: '10px 20px', 
            background: '#3f51b5', 
            color: 'white', 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center' 
        }}>
            <h1>
                <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
                    Sistema de Turnos Médicos
                </Link>
            </h1>
            <nav>
                {!estaLogueado ? (
                    <>
                        <Link to="/iniciar-sesion" style={{ color: 'white', margin: '0 10px' }}>
                            Iniciar Sesión
                        </Link>
                        <Link to="/registro" style={{ color: 'white', margin: '0 10px' }}>
                            Registrarse
                        </Link>
                    </>
                ) : (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span style={{ marginRight: '15px' }}>
                            Hola, **{usuarioAutenticado.name}** ({usuarioAutenticado.role})
                        </span>
                        <button 
                            onClick={handleCerrarSesion} 
                            style={{ padding: '8px 15px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                        >
                            Cerrar Sesión
                        </button>
                    </div>
                )}
            </nav>
        </header>
    );
}

export default Encabezado;