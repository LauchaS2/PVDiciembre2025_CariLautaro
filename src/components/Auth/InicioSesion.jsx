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

    useEffect(() => {
        if (estaLogueado) {
            navigate('/panel');
        }
    }, [estaLogueado, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        if (iniciarSesion(email, password)) {
            console.log("Inicio de sesión exitoso");
        } else {
            setError('Credenciales incorrectas. Intente de nuevo.');
        }
    };

    return (
        <div className="card-container">
            <div className="card">
                <h2 className="text-center">Inicia Sesión</h2>
                <form onSubmit={handleSubmit}>
                    {error && <div className="alert alert-danger">{error}</div>}
                    
                    <div className="form-group">
                        <label>Email:</label>
                        <input type="email" className="form-input" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    
                    <div className="form-group">
                        <label>Contraseña:</label>
                        <input type="password" className="form-input" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    
                    <button type="submit" className="btn btn-success" style={{ marginTop: '10px' }}>
                        Entrar al Sistema
                    </button>
                </form>
                <p className="text-center" style={{ marginTop: '15px' }}>
                    ¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link>
                </p>
                
                <div style={{ borderTop: '1px solid #eee', paddingTop: '10px', marginTop: '15px', fontSize: '0.9em' }}>
                    <p style={{ fontWeight: 'bold', marginBottom: '5px' }}>Usuarios de prueba:</p>
                    <ul style={{ listStyleType: 'none', paddingLeft: 0, margin: 0 }}>
                        <li>Paciente: <code>paciente@test.com</code> / <code>123</code></li>
                        <li>Médico: <code>medico@test.com</code> / <code>123</code></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default InicioSesion;