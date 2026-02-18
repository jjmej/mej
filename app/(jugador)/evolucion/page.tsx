
import { createClient } from '@/lib/supabase/server';
import EvolucionChart from '@/components/jugador/EvolucionChart';

export default async function EvolucionPage() {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return null;

    const { data: checkins } = await supabase
        .from('checkins')
        .select('*')
        .order('fecha', { ascending: true });
    
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-white">Tu Evolución</h1>
            <p className="text-slate-300">Aquí puedes ver todos tus registros a lo largo del tiempo.</p>

            <div className="bg-dark-card p-4 rounded-xl h-96">
                <EvolucionChart checkins={checkins || []} />
            </div>
        </div>
    );
}
