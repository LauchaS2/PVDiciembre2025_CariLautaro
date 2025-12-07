// src/components/Auth/Registro.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/ContextoAutenticacion';

function Registro() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [role, setRole] = useState('Paciente'); // Por defecto, registramos como Paciente
    const [error, setError] = useState('');
    const { registrarse, estaLogueado } = useAuth();
    const navigate = useNavigate();

    // Redirige al panel si el registro es exitoso o si ya estaba logueado
    useEffect(() => {
        if (estaLogueado) {
            navigate('/panel');
        }
    }, [estaLogueado, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        const userData = { email, password, name, role };
        
        if (registrarse(userData)) {
            // Éxito: El usuario se registra y se loguea automáticamente
            alert(`Registro exitoso como ${role}. Serás redirigido al panel.`);
        } else {
            setError('Error en el registro. El email ya está en uso o faltan datos.');
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h2>Registro de Nuevo Usuario</h2>
            <form onSubmit={handleSubmit}>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                
                {/* Campo Nombre */}
                <div style={{ marginBottom: '15px' }}>
                    <label>Nombre Completo:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required style={{ width: '100%', padding: '10px' }} />
                </div>
                
                {/* Campo Email */}
                <div style={{ marginBottom: '15px' }}>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', padding: '10px' }} />
                </div>
                
                {/* Campo Contraseña */}
                <div style={{ marginBottom: '15px' }}>
                    <label>Contraseña:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: '100%', padding: '10px' }} />
                </div>
                
                {/* Selección de Rol (Paciente/Médico) */}
                <div style={{ marginBottom: '15px' }}>
                    <label>Tipo de Usuario:</label>
                    <select value={role} onChange={(e) => setRole(e.target.value)} required style={{ width: '100%', padding: '10px' }}>
                        <option value="Paciente">Paciente</option>
                        <option value="Medico">Médico</option>
                    </select>
                </div>
                
                <button type="submit" style={{ width: '100%', padding: '10px', background: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}>
                    Registrarse
                </button>
            </form>
            <p style={{ marginTop: '15px', textAlign: 'center' }}>
                ¿Ya tienes cuenta? <Link to="/iniciar-sesion">Inicia Sesión</Link>
            </p>
        </div>
    );
}

// ESTA LÍNEA ES LA QUE SOLUCIONA EL ERROR:
export default Registro;