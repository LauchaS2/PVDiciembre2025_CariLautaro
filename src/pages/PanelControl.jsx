

import React from 'react';
import { useAuth } from '../context/ContextoAutenticacion';
import FormularioTurno from '../components/Appointments/AppointmentForm'; 

function PanelControl() {
    const { usuarioAutenticado, esPaciente, esMedico, turnos } = useAuth();
    
    // --- Lógica de filtrado de turnos ---
    const hoy = new Date().toISOString().slice(0, 10);
    const turnosHoy = turnos.filter(t => t.date === hoy);

    const misTurnos = esPaciente 
        ? turnosHoy.filter(t => t.paciente.id === usuarioAutenticado.id)
        : turnosHoy.filter(t => t.medico.id === usuarioAutenticado.id);

    const rol = usuarioAutenticado?.role || 'Invitado';

    return (
        <div className="main-content">
            <h1 style={{ marginBottom: '10px', fontWeight: 300 }}>Panel de Control</h1>
            <p style={{ fontSize: '1.05em', marginBottom: '30px', color: '#666' }}>
                Hola, **{usuarioAutenticado?.name}**. Rol: <span style={{ background: '#eee', padding: '4px 8px', borderRadius: '4px', color: 'var(--color-text)', fontWeight: 500 }}>{rol}</span>
            </p>
            
            
            <div style={{ 
                display: 'flex', 
                gap: '30px', 
                alignItems: 'start', 
                // Si es Médico, apila en columna (ocupa todo el ancho). Si es Paciente, usa dos filas.
                flexDirection: esMedico ? 'column' : 'row' 
            }}>
                
                {/* === CONTENIDO PARA PACIENTES (Dos Columnas Flex) === */}
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

                {/* === CONTENIDO PARA MÉDICOS (Una Sola Columna Flex) === */}
                {esMedico && (
                    <div className="card" style={{ flex: 1, borderLeft: '3px solid var(--color-warning)' }}>
                        <h3 style={{ fontWeight: 400, color: 'var(--color-text)', borderBottom: '1px solid var(--color-border)', paddingBottom: '10px', marginBottom: '15px' }}>
                            Citas Programadas para Hoy ({misTurnos.length})
                        </h3>
                        <ul style={{ listStyleType: 'none', paddingLeft: 0, margin: 0 }}>
                            {misTurnos.length === 0 
                                ? <div className="alert alert-success">¡Día tranquilo! No hay turnos programados.</div>
                                : misTurnos.map(t => (
                                    <li 
                                        key={t.id} 
                                        style={{ 
                                            padding: '10px 0', 
                                            borderBottom: '1px solid #eee',
                                            display: 'flex', 
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}
                                    >
                                        {/* HORA (Izquierda) */}
                                        <span style={{ 
                                            fontWeight: 'bold', 
                                            display: 'inline-block', 
                                            width: '80px', 
                                            color: 'var(--color-primary)' 
                                        }}>
                                            {t.time}
                                        </span> 
                                        
                                        {/* DETALLES DEL PACIENTE (Derecha) */}
                                        <div style={{ flex: 1 }}>
                                            <p style={{ margin: 0 }}>
                                                **Paciente:** {t.paciente.name}
                                            </p>
                                            <p style={{ margin: 0, fontSize: '0.9em', color: '#666' }}>
                                                **Contacto:** {t.paciente.email}
                                            </p>
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}

export default PanelControl;