
'use client'
import React, { useState } from 'react';
import { updateProfile, linkCoach, signOut } from '@/app/(jugador)/configuracion/actions';

export default function ConfiguracionForm({ profile }: { profile: any }) {
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const handleUpdate = async (formData: FormData) => {
        const result = await updateProfile(formData);
        if (result.error) {
            setMessage({ type: 'error', text: result.error });
        } else {
            setMessage({ type: 'success', text: '¡Datos actualizados correctamente!' });
        }
    };
    
    const handleLinkCoach = async (formData: FormData) => {
        const result = await linkCoach(formData);
         if (result.error) {
            setMessage({ type: 'error', text: result.error });
        } else {
            setMessage({ type: 'success', text: '¡Entrenador vinculado correctamente!' });
        }
    }

    return (
        <>
            {message && (
                <div className={`p-4 rounded-lg ${message.type === 'success' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
                    {message.text}
                </div>
            )}
            <div className="bg-dark-card p-6 rounded-lg space-y-6">
                <h2 className="text-xl font-bold">Tus Datos</h2>
                <form action={handleUpdate} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Nombre</label>
                        <input type="text" name="nombre" defaultValue={profile.nombre} className="w-full bg-slate-700 p-2 rounded" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Deporte</label>
                        <input type="text" name="deporte" defaultValue={profile.deporte} className="w-full bg-slate-700 p-2 rounded" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Club</label>
                        <input type="text" name="club" defaultValue={profile.club} className="w-full bg-slate-700 p-2 rounded" />
                    </div>
                    <button type="submit" className="btn-primary text-base py-2">
                        Actualizar Datos
                    </button>
                </form>
            </div>

            <div className="bg-dark-card p-6 rounded-lg space-y-4">
                <h2 className="text-xl font-bold">Vincular Entrenador</h2>
                <p className="text-slate-400">Si tu entrenador/a te ha dado un código, introdúcelo aquí para vincular tu perfil.</p>
                <form action={handleLinkCoach} className="flex gap-2">
                    <input type="text" name="codigo_entrenador" placeholder="Código del entrenador" className="flex-grow bg-slate-700 p-2 rounded" />
                    <button type="submit" className="btn-success px-4 py-2 text-base w-auto">Vincular</button>
                </form>
            </div>
            
            <div className="bg-dark-card p-6 rounded-lg space-y-4">
                <h2 className="text-xl font-bold text-red-500">Cerrar Sesión</h2>
                <form action={signOut}>
                    <button type="submit" className="btn-danger text-base py-2">
                        Cerrar Sesión
                    </button>
                </form>
            </div>
        </>
    );
}