// src/context/ContextoAutenticacion.jsx

import React, { createContext, useContext, useMemo } from 'react';
// IMPORTAMOS el hook con el nuevo nombre:
import { useAlmacenamientoLocal } from '../components/hooks/useAlmacenamientoLocal'; 

const ContextoAutenticacion = createContext();

// 1. Datos iniciales (se simula la base de datos)
const USUARIOS_INICIALES = [
    { id: 1, email: 'paciente@test.com', password: '123', role: 'Paciente', name: 'Laura Gómez' },
    { id: 2, email: 'medico@test.com', password: '123', role: 'Medico', name: 'Dr. Alejandro Soto', specialty: 'Cardiología' }
];

const TURNOS_INICIALES = [];

export function ProveedorAutenticacion({ children }) {
    // 2. Usamos el Custom Hook para almacenar datos persistentes
    const [usuarios, setUsuarios] = useAlmacenamientoLocal('sys_usuarios', USUARIOS_INICIALES);
    const [usuarioAutenticado, setUsuarioAutenticado] = useAlmacenamientoLocal('sys_usuario_auth', null);
    const [turnos, setTurnos] = useAlmacenamientoLocal('sys_turnos', TURNOS_INICIALES);

    // Lógica de Autenticación
    const iniciarSesion = (email, password) => {
        const user = usuarios.find(u => u.email === email && u.password === password);
        if (user) {
            setUsuarioAutenticado(user);
            return true;
        }
        return false;
    };

    const registrarse = (userData) => {
        if (usuarios.some(u => u.email === userData.email)) {
            return false; // Usuario ya existe
        }
        const nuevoUsuario = {
            ...userData,
            id: usuarios.length + 1, // Simulación de ID
        };
        setUsuarios([...usuarios, nuevoUsuario]);
        setUsuarioAutenticado(nuevoUsuario);
        return true;
    };

    const cerrarSesion = () => {
        setUsuarioAutenticado(null);
    };
    
    // Lógica de Turnos
    const reservarTurno = (datosTurno) => {
        const nuevoTurno = {
            ...datosTurno,
            id: turnos.length + 1,
            paciente: usuarioAutenticado, // Asignamos el usuario logueado como paciente
        };
        setTurnos([...turnos, nuevoTurno]);
        return nuevoTurno;
    };

    // 3. Objeto que se comparte a toda la aplicación
    const valor = useMemo(() => ({
        usuarioAutenticado,
        usuarios,
        turnos,
        iniciarSesion,
        registrarse,
        cerrarSesion,
        reservarTurno,
        estaLogueado: !!usuarioAutenticado,
        esPaciente: usuarioAutenticado?.role === 'Paciente',
        esMedico: usuarioAutenticado?.role === 'Medico',
    }), [usuarioAutenticado, usuarios, turnos]);

    return <ContextoAutenticacion.Provider value={valor}>{children}</ContextoAutenticacion.Provider>;
}

export const useAuth = () => useContext(ContextoAutenticacion);