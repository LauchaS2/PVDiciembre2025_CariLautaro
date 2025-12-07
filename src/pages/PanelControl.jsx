// src/pages/PanelControl.jsx (MODIFICAR)

import React from 'react';
import { useAuth } from '../context/ContextoAutenticacion';
import FormularioTurno from '../components/Appointments/AppointmentForm'; // Importar el formulario

function PanelControl() {
    const { usuarioAutenticado, esPaciente, esMedico, turnos } = useAuth();
    
    // Filtramos los turnos por el ID del usuario logueado (solo hoy)
    const turnosHoy = turnos.filter(t => {
        const hoy = new Date().toISOString().slice(0, 10);
        return t.date === hoy;
    });

    const misTurnos = esPaciente 
        ? turnosHoy.filter(t => t.paciente.id === usuarioAutenticado.id)
        : turnosHoy.filter(t => t.medico.id === usuarioAutenticado.id);

    // Mostramos diferente contenido según el rol
    const rol = usuarioAutenticado?.role || 'Invitado';

    return (
        <div style={{ padding: '20px' }}>
            <h2>Panel de Control</h2>
            <p>Hola, **{usuarioAutenticado?.name}**. Rol: {rol}</p>
            
            <hr />

            {/* REQUISITO DE PACIENTE: Mostrar el formulario de reserva */}
            {esPaciente && (
                <div>
                    <FormularioTurno /> {/* Aquí se inserta el componente de reserva */}
                    
                    <h4 style={{ marginTop: '30px' }}>Tus Turnos de Hoy ({misTurnos.length})</h4>
                    {misTurnos.length === 0 
                        ? <p>No tienes turnos reservados para hoy.</p>
                        : <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
                            {misTurnos.map(t => (
                                <li key={t.id} style={{ marginBottom: '10px' }}>
                                    **{t.time}** con Dr. {t.medico.name} ({t.medico.specialty})
                                </li>
                            ))}
                          </ul>
                    }
                </div>
            )}

            {/* REQUISITO DE MÉDICO: Mostrar sus turnos */}
            {esMedico && (
                <div style={{ background: '#fff3e0', padding: '20px', borderLeft: '5px solid orange', borderRadius: '4px' }}>
                    <h4>Tus Citas Programadas para Hoy ({misTurnos.length})</h4>
                    {misTurnos.length === 0 
                        ? <p>¡Tienes el día libre! No hay turnos programados para hoy.</p>
                        : <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
                            {misTurnos.map(t => (
                                <li key={t.id} style={{ marginBottom: '10px' }}>
                                    **{t.time}** - Paciente: {t.paciente.name}
                                </li>
                            ))}
                          </ul>
                    }
                </div>
            )}

        </div>
    );
}

export default PanelControl;