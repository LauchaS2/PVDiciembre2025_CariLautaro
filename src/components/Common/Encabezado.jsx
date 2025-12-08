

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
            padding: '10px 30px', /* Reducimos un poco el padding vertical para el logo */
            background: 'white', 
            borderBottom: '1px solid var(--color-border)', 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center' 
        }}>
            <h2 style={{margin: 0, fontWeight: 500}}>
                {/* === LOGO DEL HOSPITAL CON IMAGEN === */}
                <Link to="/" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontSize: '1.4rem', display: 'flex', alignItems: 'center' }}>
                    
                    {/* Usamos la etiqueta <img>. La ruta /logo_hospital.png apunta a la carpeta public. */}
                    <img 
                        src="/logo_hospital.png" 
                        alt="Logo Hospital Demacia"
                        style={{ height: '35px', marginRight: '10px' }} // Ajusta la altura a tu gusto
                    />
                    
                    Hospital 
                    Demacia
                </Link>
            </h2>
            <nav style={{ display: 'flex', alignItems: 'center' }}>
                {!estaLogueado ? (
                    <>
                        <Link to="/iniciar-sesion" style={{ color: 'var(--color-text)', margin: '0 15px' }}>
                            Iniciar Sesión
                        </Link>
                        <Link to="/registro" style={{ color: 'var(--color-text)', margin: '0 15px' }}>
                            Registrarse
                        </Link>
                    </>
                ) : (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span style={{ marginRight: '20px', fontSize: '0.95em' }}>
                            {usuarioAutenticado.name} ({usuarioAutenticado.role})
                        </span>
                        <button 
                            onClick={handleCerrarSesion} 
                            className="btn btn-neutral" 
                            style={{ width: 'auto' }}
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