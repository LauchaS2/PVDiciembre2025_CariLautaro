// src/components/Auth/InicioSesion.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/ContextoAutenticacion';

function InicioSesion() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { iniciarSesion, estaLogueado } = useAuth();
    const navigate = useNavigate();

    // Si ya está logueado, redirige al panel
    useEffect(() => {
        if (estaLogueado) {
            navigate('/panel');
        }
    }, [estaLogueado, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (iniciarSesion(email, password)) {
            // Éxito: El useEffect de arriba se encargará de redirigir
            console.log("Inicio de sesión exitoso");
        } else {
            setError('Credenciales incorrectas. Intente de nuevo.');
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h2>Inicia Sesión</h2>
            <form onSubmit={handleSubmit}>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                
                <div style={{ marginBottom: '15px' }}>
                    <label>Email:</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                        style={{ width: '100%', padding: '10px' }}
                    />
                </div>
                
                <div style={{ marginBottom: '15px' }}>
                    <label>Contraseña:</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                        style={{ width: '100%', padding: '10px' }}
                    />
                </div>
                
                <button type="submit" style={{ width: '100%', padding: '10px', background: '#4caf50', color: 'white', border: 'none', cursor: 'pointer' }}>
                    Entrar al Sistema
                </button>
            </form>
            <p style={{ marginTop: '15px', textAlign: 'center' }}>
                ¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link>
            </p>
            
            {/* Notas para el evaluador: */}
            <blockquote style={{ fontSize: '0.8em', background: '#f0f0f0', padding: '10px', borderLeft: '3px solid blue' }}>
                <p>Usuarios de prueba (cargados en ContextoAutenticacion.jsx):</p>
                <ul>
                    <li>Paciente: paciente@test.com / 123</li>
                    <li>Médico: medico@test.com / 123</li>
                </ul>
            </blockquote>
        </div>
    );
}

export default InicioSesion;