// src/components/Appointments/AppointmentDetail.jsx

import React from 'react';

function DetalleTurno({ turno, onNuevaReserva }) {
    if (!turno) return null;

    return (
        <div style={{ border: '2px solid green', padding: '20px', borderRadius: '8px', marginTop: '20px' }}>
            <h3>✅ Turno Confirmado Exitosamente</h3>
            
            <p style={{ fontWeight: 'bold' }}>
                Fecha: {turno.date} | Hora: {turno.time}
            </p>
            
            <hr />

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                    <h4>Datos del Paciente</h4>
                    <p>Nombre: {turno.paciente.name}</p>
                    <p>Email: {turno.paciente.email}</p>
                </div>
                <div>
                    <h4>Datos del Médico</h4>
                    <p>Nombre: {turno.medico.name}</p>
                    <p>Especialidad: {turno.medico.specialty || 'General'}</p>
                </div>
            </div>

            <button 
                onClick={onNuevaReserva} 
                style={{ 
                    padding: '10px 20px', 
                    background: '#007bff', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '4px', 
                    cursor: 'pointer',
                    marginTop: '15px'
                }}
            >
                Reservar Otro Turno
            </button>
            {/* Aquí podrías agregar el valor agregado de imprimir en PDF */}
        </div>
    );
}

export default DetalleTurno;