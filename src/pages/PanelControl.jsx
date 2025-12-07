// src/pages/PanelControl.jsx

import React from 'react';
import { useAuth } from '../context/ContextoAutenticacion'; // Usamos el contexto para obtener datos

function PanelControl() {
    const { usuarioAutenticado, esPaciente, esMedico, turnos } = useAuth();
    
    // Mostramos diferente contenido según el rol
    const rol = usuarioAutenticado?.role || 'Invitado';

    return (
        <div style={{ padding: '20px' }}>
            <h2>Bienvenido al Panel de Control, {usuarioAutenticado?.name}</h2>
            <h3>Rol: {rol}</h3>
            
            <hr />

            {/* Requisito: Si es Paciente, puede seleccionar turno */}
            {esPaciente && (
                <div style={{ background: '#e8f5e9', padding: '15px', borderLeft: '5px solid green' }}>
                    <h4>Funcionalidad de Paciente: Reservar Turno</h4>
                    <p>Aquí irá el componente de formulario de turnos (AppointmentForm).</p>
                    {/* Más adelante pondremos aquí: <AppointmentForm /> */}
                    
                    {/* También mostramos sus turnos reservados */}
                    <h4>Mis Turnos Reservados</h4>
                    {turnos.length === 0 
                        ? <p>Aún no has reservado ningún turno.</p>
                        : <ul>
                            {turnos.filter(t => t.paciente.id === usuarioAutenticado.id).map(t => (
                                <li key={t.id}>
                                    {t.date} a las {t.time} con el Dr. {t.medico.name} ({t.medico.specialty})
                                </li>
                            ))}
                          </ul>
                    }

                </div>
            )}

            {/* Requisito: Si es Médico, puede ver algo diferente */}
            {esMedico && (
                <div style={{ background: '#fff3e0', padding: '15px', borderLeft: '5px solid orange' }}>
                    <h4>Funcionalidad de Médico</h4>
                    <p>¡Hola Dr. {usuarioAutenticado.name}! Hoy tiene {turnos.filter(t => t.medico.id === usuarioAutenticado.id).length} turnos.</p>
                    {/* Aquí iría la lista de sus turnos del día */}
                </div>
            )}

        </div>
    );
}

// ESTA LÍNEA ES LA QUE FALTABA
export default PanelControl;