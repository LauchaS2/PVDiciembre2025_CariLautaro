// src/components/Appointments/AppointmentForm.jsx

import React, { useState, useMemo } from 'react';
import DetalleTurno from './AppointmentDetail'; // Importamos el detalle
import { useAuth } from '../../context/ContextoAutenticacion';

// Horarios fijos de MAÑANA para UN SOLO DÍA
const HORARIOS_MANANA = [
    '08:00', '08:30', '09:00', '09:30',
    '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', 
];

function FormularioTurno() {
    const { usuarios, turnos, reservarTurno, usuarioAutenticado } = useAuth();
    const [idMedicoSeleccionado, setIdMedicoSeleccionado] = useState('');
    const [slotSeleccionado, setSlotSeleccionado] = useState('');
    const [turnoReservado, setTurnoReservado] = useState(null); // Estado para mostrar la confirmación

    // 1. Filtrar solo los usuarios con rol 'Medico'
    const medicos = useMemo(() => usuarios.filter(u => u.role === 'Medico'), [usuarios]);
    
    // 2. Calcular turnos disponibles para el médico seleccionado (FILTRO CRUCIAL)
    const horariosDisponibles = useMemo(() => {
        if (!idMedicoSeleccionado) return [];

        // Obtenemos la fecha de HOY en formato YYYY-MM-DD
        const hoy = new Date().toISOString().slice(0, 10); 
        
        // Turnos ya reservados HOY para el médico seleccionado
        const slotsOcupadosHoy = turnos
            .filter(t => 
                t.medico.id.toString() === idMedicoSeleccionado && 
                t.date === hoy // Filtramos SOLO por el día de HOY
            )
            .map(t => t.time);

        // Devolvemos solo los horarios de MAÑANA que NO están ocupados hoy
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

        setTurnoReservado(nuevoTurno); // Mostrar confirmación (Requisito 5)
        // Limpiar formulario
        setIdMedicoSeleccionado('');
        setSlotSeleccionado('');
    };

    // Si hay un turno reservado, mostramos el detalle en lugar del formulario
    if (turnoReservado) {
        return <DetalleTurno turno={turnoReservado} onNuevaReserva={() => setTurnoReservado(null)} />;
    }

    return (
        <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '4px' }}>
            <h4>Solicitar Nuevo Turno (Solo Hoy: {new Date().toLocaleDateString()})</h4>
            <form onSubmit={handleSubmit}>
                
                {/* Selección de Médico */}
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Seleccionar Médico:</label>
                    <select 
                        value={idMedicoSeleccionado} 
                        onChange={(e) => {
                            setIdMedicoSeleccionado(e.target.value);
                            setSlotSeleccionado(''); // Resetea el slot al cambiar de médico
                        }}
                        required
                        style={{ width: '100%', padding: '10px' }}
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
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>
                            Turnos Disponibles (Mañana):
                        </label>
                        <select 
                            value={slotSeleccionado} 
                            onChange={(e) => setSlotSeleccionado(e.target.value)}
                            required
                            style={{ width: '100%', padding: '10px' }}
                        >
                            <option value="">-- Elija un Horario --</option>
                            {horariosDisponibles.map(slot => (
                                <option key={slot} value={slot}>{slot}</option>
                            ))}
                        </select>
                        {horariosDisponibles.length === 0 && (
                            <p style={{ color: 'red', marginTop: '5px' }}>No hay turnos disponibles hoy para este médico.</p>
                        )}
                    </div>
                )}
                
                <button 
                    type="submit" 
                    disabled={!idMedicoSeleccionado || !slotSeleccionado}
                    style={{ 
                        width: '100%', 
                        padding: '10px', 
                        background: '#007bff', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '4px',
                        cursor: 'pointer' 
                    }}
                >
                    Confirmar Turno
                </button>
            </form>
        </div>
    );
}

export default FormularioTurno;