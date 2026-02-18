
import { createClient } from '@/lib/supabase/server';
import React from 'react';

interface Achievement {
    id: string;
    title: string;
    description: string;
    emoji: string;
    isUnlocked: boolean;
}

export default async function LogrosPage() {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return null;

    const { data: checkins, count: checkinCount } = await supabase.from('checkins').select('*', { count: 'exact' });
    const { data: logrosPersonales, count: logrosCount } = await supabase.from('logros_personales').select('*', { count: 'exact' });
    const { data: metas, count: metasCount } = await supabase.from('metas').select('*', { count: 'exact' });
    const { data: metasCumplidas } = await supabase.from('metas').select('id').eq('resultado', 'si').limit(1);

    // Lógica para badges más complejos se puede añadir aquí
    // const { data: badges } = await supabase.from('badges').select('badge_id');
    // const unlockedBadges = badges?.map(b => b.badge_id) || [];

    const achievements: Achievement[] = [
        { id: 'checkin1', title: "Primer Paso", description: "Has completado tu primer check-in diario.", emoji: '👟', isUnlocked: (checkinCount ?? 0) >= 1 },
        { id: 'checkin7', title: "Hábito Constante", description: "Has completado 7 check-ins.", emoji: '🔥', isUnlocked: (checkinCount ?? 0) >= 7 },
        { id: 'logro1', title: "Reconociendo el Éxito", description: "Has añadido tu primer logro personal.", emoji: '🏆', isUnlocked: (logrosCount ?? 0) >= 1 },
        { id: 'meta1', title: "Arquitecto de Metas", description: "Has definido tu primera meta semanal.", emoji: '🎯', isUnlocked: (metasCount ?? 0) >= 1 },
        { id: 'meta_cumplida', title: "Misión Cumplida", description: "Has completado tu primera meta.", emoji: '✅', isUnlocked: (metasCumplidas?.length ?? 0) > 0 },
        // Insignias para módulos (requeriría seguimiento en DB)
        { id: 'foco_master', title: "Maestro del Foco", description: "Completa el ejercicio de concentración.", emoji: '🧘', isUnlocked: false },
        { id: 'calma_total', title: "Corazón Tranquilo", description: "Completa el ejercicio de respiración.", emoji: '🌬️', isUnlocked: false },
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-white">Tus Logros</h1>
            <p className="text-slate-300">¡Celebra tu progreso y consistencia!</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {achievements.map(ach => (
                    <div key={ach.id} className={`p-4 rounded-lg flex flex-col items-center text-center transition-opacity ${ach.isUnlocked ? 'bg-dark-card' : 'bg-dark-card opacity-40'}`}>
                        <span className={`text-5xl mb-2 ${ach.isUnlocked ? '' : 'grayscale'}`}>{ach.emoji}</span>
                        <h2 className="font-bold text-sm">{ach.title}</h2>
                        <p className="text-xs text-slate-400 mt-1">{ach.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};
