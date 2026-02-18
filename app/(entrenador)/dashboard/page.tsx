// FIX: Import React to resolve issue with key prop type checking.
import React from 'react';
import { createClient } from "@/lib/supabase/server";
import { redirect } from 'next/navigation';
import Link from 'next/link';

async function getTeamData(coachId: string) {
    const supabase = createClient();
    const { data, error } = await supabase
        .from('profiles')
        .select(`
            id,
            nombre,
            deporte,
            age_range,
            acepta_notas_visibles,
            checkins (
                fecha,
                estado_emoji,
                nivel_estres,
                nivel_energia,
                ganas_entrenar,
                nota_libre
            )
        `)
        .eq('entrenador_id', coachId)
        .order('fecha', { referencedTable: 'checkins', ascending: false });
    
    if (error) {
        console.error("Error fetching team data:", error);
        return [];
    }
    return data;
}

// FIX: Change component definition to use React.FC to solve key prop typing issue.
const PlayerCard: React.FC<{ player: any }> = ({ player }) => {
    // Lógica de Alertas
    const lastCheckin = player.checkins?.[0];
    let alert = null;
    if (!lastCheckin) {
        alert = { type: '🔴', message: 'Sin check-ins registrados.' };
    } else {
        const lastDate = new Date(lastCheckin.fecha);
        const today = new Date();
        const diffDays = (today.getTime() - lastDate.getTime()) / (1000 * 3600 * 24);
        if (diffDays > 2) {
            alert = { type: '🔴', message: `Último check-in hace ${Math.floor(diffDays)} días.` };
        } else {
            const lowScores = [lastCheckin.estado_emoji, lastCheckin.nivel_estres, lastCheckin.nivel_energia, lastCheckin.ganas_entrenar].filter(s => s <= 2).length;
            if (lowScores >= 2) {
                 alert = { type: '🟡', message: 'Múltiples indicadores bajos en el último check-in.' };
            }
        }
    }

    return (
        <div className="bg-dark-card p-4 rounded-lg border-l-4 border-slate-600">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-xl font-bold">{player.nombre}</h3>
                    <p className="text-sm text-slate-400">{player.deporte} - {player.age_range} años</p>
                </div>
                {alert && (
                     <div className="text-center">
                        <span className="text-2xl">{alert.type}</span>
                        <p className="text-xs text-slate-400">{alert.message}</p>
                    </div>
                )}
            </div>
            {lastCheckin && (
                <div className="mt-4 pt-4 border-t border-slate-700 text-sm">
                    <p className="font-semibold mb-1">Último Check-in ({new Date(lastCheckin.fecha).toLocaleDateString()}):</p>
                    <div className="grid grid-cols-2 gap-x-4">
                        <p>Emoji: {{1:'😞', 2:'😐', 3:'🙂', 4:'😄'}[lastCheckin.estado_emoji]}</p>
                        <p>Estrés: {lastCheckin.nivel_estres}/5</p>
                        <p>Energía: {lastCheckin.nivel_energia}/5</p>
                        <p>Ganas: {lastCheckin.ganas_entrenar}/5</p>
                    </div>
                    <div className="mt-2">
                        <p className="font-semibold">Nota:</p>
                        <p className="italic text-slate-300 bg-slate-800 p-2 rounded">
                            {player.acepta_notas_visibles ? (lastCheckin.nota_libre || 'Sin nota.') : '🔒 Privado'}
                        </p>
                    </div>
                </div>
            )}
             <Link href={`/jugador/${player.id}`} className="block text-center mt-4 bg-brand-blue text-white font-semibold py-1 px-3 rounded-lg text-sm w-full">
                Ver Detalles
            </Link>
        </div>
    )
}


export default async function CoachDashboardPage() {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/auth/login');
    }
    
    const { data: coachProfile } = await supabase.from('profiles').select('nombre, club, codigo_entrenador').single();

    const teamData = await getTeamData(user.id);

    return (
        <div className="min-h-screen bg-dark-bg text-dark-text p-4">
            <div className="container mx-auto space-y-8 pb-8">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold">Panel de Entrenador</h1>
                        <p className="text-slate-300">Equipo: {coachProfile?.club}</p>
                    </div>
                    {/* Botón de cerrar sesión iría en /configuracion */}
                </div>

                <div className="bg-dark-card p-6 rounded-lg">
                    <h2 className="text-xl font-bold text-white">Código de tu equipo</h2>
                    <p className="text-slate-400">Comparte este código con tus jugadores para que se unan:</p>
                    <p className="font-mono text-3xl text-brand-yellow bg-slate-800 p-3 rounded-lg text-center mt-2">{coachProfile?.codigo_entrenador}</p>
                </div>
                
                 <div className="bg-dark-card p-6 rounded-lg">
                    <h2 className="text-xl font-bold text-white mb-2">Aviso visible para el entrenador</h2>
                     <p className="text-sm text-yellow-300 bg-yellow-900/50 p-3 rounded-lg">
                        Solo ves datos de bienestar general. El contenido personal y sensible de cada jugador (módulos, screenings) es privado y nunca será visible para ti.
                     </p>
                </div>

                <div className="space-y-4">
                    {teamData.map(player => (
                        <PlayerCard key={player.id} player={player} />
                    ))}
                </div>
            </div>
        </div>
    );
}