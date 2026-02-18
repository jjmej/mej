
'use client'
import React, { useState } from 'react';

type Role = 'jugador' | 'entrenador';

interface RegisterFormProps {
    action: (formData: FormData) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ action }) => {
    const [role, setRole] = useState<Role>('jugador');
    const [error, setError] = useState('');

    const commonFields = (
        <>
            <input type="text" name="nombre" placeholder="Tu nombre completo" className="w-full bg-dark-card border border-slate-600 text-white rounded-lg p-3 text-center text-lg" required />
            <input type="email" name="email" placeholder="Tu email" className="w-full bg-dark-card border border-slate-600 text-white rounded-lg p-3 text-center text-lg" required />
            <input type="password" name="password" placeholder="Crea una contraseña" className="w-full bg-dark-card border border-slate-600 text-white rounded-lg p-3 text-center text-lg" required />
            <input type="text" name="deporte" placeholder={role === 'jugador' ? 'Tu deporte principal' : 'Deporte del equipo'} className="w-full bg-dark-card border border-slate-600 text-white rounded-lg p-3 text-center text-lg" required />
            <input type="text" name="club" placeholder="Nombre de tu Club o Equipo" className="w-full bg-dark-card border border-slate-600 text-white rounded-lg p-3 text-center text-lg" required />
        </>
    );

    return (
        <form action={action} className="w-full space-y-4">
            <input type="hidden" name="rol" value={role} />
            <div className="grid grid-cols-2 gap-2 bg-dark-card p-1 rounded-lg mb-6">
                <button type="button" onClick={() => setRole('jugador')} className={`py-2 rounded-md font-semibold ${role === 'jugador' ? 'bg-brand-blue' : ''}`}>Soy Jugador</button>
                <button type="button" onClick={() => setRole('entrenador')} className={`py-2 rounded-md font-semibold ${role === 'entrenador' ? 'bg-brand-blue' : ''}`}>Soy Entrenador</button>
            </div>

            {commonFields}

            {role === 'jugador' ? (
                <>
                    <select name="edad" className="w-full bg-dark-card border border-slate-600 text-white rounded-lg p-3 text-center text-lg" required defaultValue="">
                        <option value="" disabled>Selecciona tu edad</option>
                        {Array.from({ length: 11 }, (_, i) => i + 8).map(a => (<option key={a} value={a}>{a} años</option>))}
                    </select>
                    <input type="text" name="codigo_entrenador" placeholder="Código de tu entrenador (opcional)" className="w-full bg-dark-card border border-slate-600 text-white rounded-lg p-3 text-center text-lg" />
                </>
            ) : (
                <input type="text" name="codigo_entrenador" placeholder="Crea un código único para tu equipo" className="w-full bg-dark-card border border-slate-600 text-white rounded-lg p-3 text-center text-lg" required />
            )}
            
            {error && <p className="text-red-500 text-sm">{error}</p>}
            
            <button type="submit" className="w-full bg-brand-blue hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg text-xl transition-colors !mt-6">
                Crear cuenta
            </button>
        </form>
    );
};

export default RegisterForm;
