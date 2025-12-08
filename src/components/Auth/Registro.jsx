

import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/ContextoAutenticacion';

function Registro() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [role, setRole] = useState('Paciente');
    const [error, setError] = useState('');
    const { registrarse, estaLogueado } = useAuth();
    const navigate = useNavigate();

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
            alert(`Registro exitoso como ${role}. Serás redirigido al panel.`);
        } else {
            setError('Error en el registro. El email ya está en uso.');
        }
    };

    return (
        <div className="card-container">
            <div className="card">
                <h2 className="text-center">Registro de Nuevo Usuario</h2>
                <form onSubmit={handleSubmit}>
                    {error && <div className="alert alert-danger">{error}</div>}
                    
                    <div className="form-group">
                        <label>Nombre Completo:</label>
                        <input type="text" className="form-input" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    
                    <div className="form-group">
                        <label>Email:</label>
                        <input type="email" className="form-input" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    
                    <div className="form-group">
                        <label>Contraseña:</label>
                        <input type="password" className="form-input" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    
                    <div className="form-group">
                        <label>Tipo de Usuario:</label>
                        <select className="form-select" value={role} onChange={(e) => setRole(e.target.value)} required>
                            <option value="Paciente">Paciente</option>
                            <option value="Medico">Médico</option>
                        </select>
                    </div>
                    
                    <button type="submit" className="btn btn-primary" style={{ marginTop: '10px' }}>
                        Registrarse
                    </button>
                </form>
                <p className="text-center" style={{ marginTop: '15px' }}>
                    ¿Ya tienes cuenta? <Link to="/iniciar-sesion">Inicia Sesión</Link>
                </p>
            </div>
        </div>
    );
}

export default Registro;