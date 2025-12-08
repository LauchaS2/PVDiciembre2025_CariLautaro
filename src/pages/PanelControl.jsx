// src/pages/PanelControl.jsx

import React from 'react';
import { useAuth } from '../context/ContextoAutenticacion';
import FormularioTurno from '../components/Appointments/AppointmentForm'; 

function PanelControl() {
    const { usuarioAutenticado, esPaciente, esMedico, turnos } = useAuth();
    
    const hoy = new Date().toISOString().slice(0, 10);
    const turnosHoy = turnos.filter(t => t.date === hoy);

    const misTurnos = esPaciente 
        ? turnosHoy.filter(t => t.paciente.id === usuarioAutenticado.id)
        : turnosHoy.filter(t => t.medico.id === usuarioAutenticado.id);

    const rol = usuarioAutenticado?.role || 'Invitado';

// src/pages/PanelControl.jsx (MODIFICAR EL DIV PRINCIPAL)

// ... (~Línea 30)
    return (
        <div className="main-content">
            {/* ... Encabezado y saludo ... */}
            
            {/* APLICAMOS DISPLAY: FLEX SIMPLE EN LUGAR DE GRID COMPLEJO */}
            <div style={{ 
                display: 'flex', 
                gap: '30px', /* Espacio fijo de 30px entre los items */
                alignItems: 'start', /* Alineación vertical */
                flexDirection: esMedico ? 'column' : 'row' /* Columna si es médico, Fila si es paciente */
            }}>
                
                {/* === CONTENIDO PARA PACIENTES === */}
                {esPaciente && (
                    <>
                        {/* PRIMERA COLUMNA: RESERVAR TURNO */}
                        <div className="card" style={{ flex: 1, height: 'fit-content' }}>
                            <h3 style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '10px', marginBottom: '15px', fontWeight: 400, color: 'var(--color-primary)' }}>Reservar Nuevo Turno</h3>
                            <FormularioTurno />
                        </div>
                        
                        {/* SEGUNDA COLUMNA: TUS TURNOS */}
                        <div className="card" style={{ flex: 1, height: 'fit-content' }}>
                            <h3 style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '10px', marginBottom: '15px', fontWeight: 400, color: 'var(--color-text)' }}>Tus Turnos de Hoy ({misTurnos.length})</h3>
                            <ul style={{ listStyleType: 'none', paddingLeft: '0', margin: 0 }}>
                                {misTurnos.length === 0 
                                    ? <p style={{ color: '#999' }}>No tienes turnos reservados para hoy.</p>
                                    : misTurnos.map(t => (
                                        <li key={t.id} style={{ marginBottom: '10px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
                                            <span style={{ fontWeight: 'bold', color: 'var(--color-primary)', marginRight: '10px' }}>{t.time}</span> con Dr. {t.medico.name} ({t.medico.specialty})
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </>
                )}

                {/* === CONTENIDO PARA MÉDICOS (Asegurar que ocupe todo el ancho) === */}
                {esMedico && (
                    <div className="card" style={{ flex: 1, borderLeft: '3px solid var(--color-warning)' }}>
                        <h3 style={{ fontWeight: 400, color: 'var(--color-text)', borderBottom: '1px solid var(--color-border)', paddingBottom: '10px', marginBottom: '15px' }}>
                            Citas Programadas para Hoy ({misTurnos.length})
                        </h3>
                        <ul style={{ listStyleType: 'none', paddingLeft: 0, margin: 0 }}>
                           {/* ... contenido del médico ... */}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}

export default PanelControl;