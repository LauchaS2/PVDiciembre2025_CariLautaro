// src/components/Appointments/AppointmentDetail.jsx (MODIFICAR)

import React from 'react';

function DetalleTurno({ turno, onNuevaReserva }) {
    if (!turno) return null;

    return (
        <div className="alert alert-success">
            <h4 style={{ color: 'var(--color-success)', borderBottom: '1px solid #c3e6cb', paddingBottom: '10px', marginBottom: '15px', fontWeight: 500 }}>✅ Turno Confirmado</h4>
            
            <p style={{ fontWeight: 'bold', marginBottom: '10px' }}>
                Fecha: {turno.date} | Hora: <span style={{ color: 'var(--color-primary)' }}>{turno.time}</span>
            </p>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '15px' }}>
                <div style={{ border: '1px solid var(--color-border)', padding: '15px', borderRadius: '4px' }}>
                    <h5 style={{ color: 'var(--color-primary)', fontWeight: 500, marginTop: 0 }}>Paciente</h5>
                    <p style={{ margin: 0 }}>{turno.paciente.name}</p>
                    <p style={{ margin: 0, fontSize: '0.9em', color: '#666' }}>{turno.paciente.email}</p>
                </div>
                <div style={{ border: '1px solid var(--color-border)', padding: '15px', borderRadius: '4px' }}>
                    <h5 style={{ color: 'var(--color-success)', fontWeight: 500, marginTop: 0 }}>Médico</h5>
                    <p style={{ margin: 0 }}>{turno.medico.name}</p>
                    <p style={{ margin: 0, fontSize: '0.9em', color: '#666' }}>{turno.medico.specialty || 'General'}</p>
                </div>
            </div>

            <button 
                onClick={onNuevaReserva} 
                className="btn btn-primary" 
                style={{ marginTop: '20px', width: 'auto', padding: '10px 30px' }}
            >
                Reservar Otro Turno
            </button>
            
        </div>
    );
}

export default DetalleTurno;