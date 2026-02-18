// FIX: Import React to be in scope for JSX.
import React from "react";
import { createClient } from "@/lib/supabase/server";
// FIX: Correct Link import and use it for navigation instead of `a` tag.
import Link from "next/link";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const feelingToValue = { 1: '😞', 2: '😐', 3: '🙂', 4: '😄' };
const valueToColor = { 1: '#F97316', 2: '#EAB308', 3: '#22C55E', 4: '#3B82F6' };

const ModuleCard: React.FC<{ to: string; title: string; color: string; icon: string }> = ({ to, title, color, icon }) => (
  // Link component from Next.js is used here
  <Link href={to} className={`bg-dark-card p-6 rounded-xl shadow-lg flex flex-col justify-between hover:scale-105 transition-transform border-l-4 ${color}`}>
    <div className="flex items-center justify-between">
      <h3 className="text-xl font-bold text-white">{title}</h3>
      <span className="text-3xl">{icon}</span>
    </div>
  </Link>
);


// Recharts components must be client-side
const EmotionChart = ({ data }: { data: any[] }) => {
    'use client';
    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
            <XAxis dataKey="day" stroke="#94A3B8" />
            <YAxis domain={[0, 4]} tick={false} axisLine={false} />
            <Tooltip contentStyle={{ backgroundColor: '#0F172A', border: '1px solid #334155' }} />
            <Bar dataKey="feelingValue">
                {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={valueToColor[entry.feelingValue as keyof typeof valueToColor]} />
                ))}
            </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
}

export default async function DashboardPage() {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return null;

    const { data: profile } = await supabase.from('profiles').select('nombre').single();
    const { data: checkins } = await supabase
        .from('checkins')
        .select('*')
        .order('fecha', { ascending: false })
        .limit(7);

    let showCheckinReminder = false;
    if (!checkins || checkins.length === 0) {
        showCheckinReminder = true;
    } else {
        const lastCheckinDate = new Date(checkins[0].fecha);
        const today = new Date();
        today.setHours(0,0,0,0);
        lastCheckinDate.setHours(0,0,0,0);

        const diffTime = Math.abs(today.getTime() - lastCheckinDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays >= 1) { // Reminder if they haven't checked in today
            showCheckinReminder = true;
        }
    }
    
    const last7DaysCheckins = (checkins || []).slice().reverse().map(c => ({
      day: new Date(c.fecha).toLocaleDateString('es-ES', { weekday: 'short' }),
      feelingValue: c.estado_emoji
    }));

    return (
        <div className="space-y-8">
          <h1 className="text-3xl font-bold text-white">¡Hola, {profile?.nombre}! 👋</h1>
          
          {showCheckinReminder && (
              <div className="bg-brand-orange/20 border border-brand-orange text-white p-4 rounded-lg">
                  <p>🔔 No te olvides de hacer tu check-in de hoy. ¡Es un paso importante para tu bienestar!</p>
              </div>
          )}

          <Link href="/checkin" className="block w-full text-center bg-brand-green hover:bg-green-700 text-white font-bold py-4 px-4 rounded-lg text-xl transition-colors shadow-lg">
            CHECK-IN DIARIO
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ModuleCard to="/modulo/rendimiento" title="Rendimiento Mental" color="border-brand-blue" icon="🔵" />
            <ModuleCard to="/modulo/bienestar" title="Salud y Bienestar" color="border-brand-green" icon="🟢" />
            <ModuleCard to="/modulo/problemas" title="Gestión de Problemas" color="border-brand-orange" icon="🟠" />
            <ModuleCard to="/modulo/prevencion" title="Prevención" color="border-brand-yellow" icon="🟡" />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Tu estado emocional (últimos 7 días)</h2>
            <div className="bg-dark-card p-4 rounded-xl h-64">
                {last7DaysCheckins.length > 0 ? (
                    <EmotionChart data={last7DaysCheckins} />
                ) : (
                    <div className="flex items-center justify-center h-full text-slate-400">
                        <p>No hay datos de check-in todavía. ¡Completa tu primer check-in para ver tu progreso!</p>
                    </div>
                )}
            </div>
          </div>
        </div>
      );
}