

import React, { useState, useMemo } from 'react';
import DetalleTurno from './AppointmentDetail'; 
import { useAuth } from '../../context/ContextoAutenticacion';

const HORARIOS_MANANA = [
    '08:00', '08:30', '09:00', '09:30',
    '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', 
];

function FormularioTurno() {
    const { usuarios, turnos, reservarTurno } = useAuth();
    const [idMedicoSeleccionado, setIdMedicoSeleccionado] = useState('');
    const [slotSeleccionado, setSlotSeleccionado] = useState('');
    const [turnoReservado, setTurnoReservado] = useState(null);

    const medicos = useMemo(() => usuarios.filter(u => u.role === 'Medico'), [usuarios]);
    
    const horariosDisponibles = useMemo(() => {
        if (!idMedicoSeleccionado) return [];

        const hoy = new Date().toISOString().slice(0, 10); 
        
      
const slotsOcupadosHoy = turnos
    .filter(t => 
        t.medico && t.medico.id && t.medico.id !== undefined && 
        t.medico.id.toString() === idMedicoSeleccionado && 
        t.date === hoy
    )
    .map(t => t.time);
        return HORARIOS_MANANA.filter(slot => !slotsOcupadosHoy.includes(slot));
    }, [idMedicoSeleccionado, turnos]);


    const handleSubmit = (e) => {
        e.preventDefault();
        if (!idMedicoSeleccionado || !slotSeleccionado) return alert('Por favor, selecciona un médico y un horario.');
        
        const medico = medicos.find(d => d.id.toString() === idMedicoSeleccionado);
        const hoy = new Date().toISOString().slice(0, 10);
        
        const nuevoTurno = reservarTurno({
            date: hoy,
            time: slotSeleccionado,
            medico: medico,
        });

        setTurnoReservado(nuevoTurno);
        setIdMedicoSeleccionado('');
        setSlotSeleccionado('');
    };

    if (turnoReservado) {
        return <DetalleTurno turno={turnoReservado} onNuevaReserva={() => setTurnoReservado(null)} />;
    }

    return (
        <form onSubmit={handleSubmit}>
            <p style={{ fontWeight: 'bold', marginBottom: '15px' }}>Solicitar Cita Médica</p>
            
            {/* Selección de Médico */}
            <div className="form-group">
                <label>Seleccionar Médico:</label>
                <select 
                    value={idMedicoSeleccionado} 
                    onChange={(e) => {
                        setIdMedicoSeleccionado(e.target.value);
                        setSlotSeleccionado('');
                    }}
                    required
                    className="form-select"
                >
                    <option value="">-- Elija un Médico --</option>
                    {medicos.map(doc => (
                        <option key={doc.id} value={doc.id}>
                            {doc.name} - {doc.specialty}
                        </option>
                    ))}
                </select>
            </div>

            {/* Selección de Turno */}
            {idMedicoSeleccionado && (
                <div className="form-group">
                    <label>Turnos Disponibles (Mañana):</label>
                    <select 
                        value={slotSeleccionado} 
                        onChange={(e) => setSlotSeleccionado(e.target.value)}
                        required
                        className="form-select"
                    >
                        <option value="">-- Elija un Horario --</option>
                        {horariosDisponibles.map(slot => (
                            <option key={slot} value={slot}>{slot}</option>
                        ))}
                    </select>
                    {horariosDisponibles.length === 0 && (
                        <div className="alert alert-danger" style={{ marginTop: '10px' }}>No hay turnos disponibles hoy para este médico.</div>
                    )}
                </div>
            )}
            
            <button 
                type="submit" 
                disabled={!idMedicoSeleccionado || !slotSeleccionado}
                className="btn btn-primary"
                style={{ marginTop: '10px' }}
            >
                Confirmar Turno
            </button>
        </form>
    );
}

export default FormularioTurno;