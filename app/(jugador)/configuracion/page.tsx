
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import ConfiguracionForm from '@/components/jugador/ConfiguracionForm';

export default async function ConfiguracionPage() {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/auth/login');
    }

    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .single();
    
    if (!profile) {
        // Esto podría pasar si el perfil no se creó correctamente en el registro
        return <div>Error al cargar el perfil.</div>;
    }

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-white">Configuración</h1>
            <ConfiguracionForm profile={profile} />
        </div>
    );
}
