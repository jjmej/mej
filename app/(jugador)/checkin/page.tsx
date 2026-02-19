
'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { saveCheckin } from './actions';
import { SparklesIcon } from '@heroicons/react/24/solid';

const feelings: (1 | 2 | 3 | 4)[] = [1, 2, 3, 4];
const feelingEmojis = { 1: '😞', 2: '😐', 3: '🙂', 4: '😄' };

export default function CheckInPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [feeling, setFeeling] = useState<number | null>(null);
  const [stress, setStress] = useState(3);
  const [energy, setEnergy] = useState(3);
  const [motivation, setMotivation] = useState(3);
  const [notes, setNotes] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (feeling === null) {
      setError('Por favor, selecciona cómo te sientes hoy.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append('estado_emoji', String(feeling));
      formData.append('nivel_estres', String(stress));
      formData.append('nivel_energia', String(energy));
      formData.append('ganas_entrenar', String(motivation));
      formData.append('nota_libre', notes);

      const result = await saveCheckin(formData);
      if (result.error) {
        throw new Error(result.error);
      }
      // Redirect to dashboard on success
      router.push('/dashboard');
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const Slider: React.FC<{label: string, value: number, onChange: (val: number) => void}> = ({ label, value, onChange }) => (
    <div className="w-full">
      <label className="block text-lg text-white mb-2">{label}</label>
      <div className="flex items-center space-x-4">
        <span className="text-slate-400">1</span>
        <input
          type="range"
          min="1"
          max="5"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-brand-blue"
        />
        <span className="text-slate-400">5</span>
      </div>
      <div className="text-center text-white font-bold text-lg sm:text-xl mt-1">{value}</div>
    </div>
  );

  return (
    <div className="space-y-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-white">Check-in Diario</h1>
      <form onSubmit={handleSubmit} className="bg-dark-card p-6 rounded-lg space-y-8">
        <div>
          <label className="block text-lg sm:text-xl text-white mb-4 text-center">¿Cómo me siento hoy?</label>
          <div className="flex justify-around">
            {feelings.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFeeling(f)}
                className={`text-5xl p-2 rounded-full transition-transform transform hover:scale-110 ${feeling === f ? 'bg-brand-blue/30 scale-125' : ''}`}
              >
                {feelingEmojis[f as keyof typeof feelingEmojis]}
              </button>
            ))}
          </div>
        </div>
        
        <Slider label="Nivel de estrés" value={stress} onChange={setStress} />
        <Slider label="Nivel de energía" value={energy} onChange={setEnergy} />
        <Slider label="Ganas de entrenar" value={motivation} onChange={setMotivation} />

        <div>
          <label htmlFor="notes" className="block text-lg text-white mb-2">¿Algo que quieras contar?</label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="(Opcional)"
            rows={3}
            className="w-full bg-slate-700 border border-slate-600 text-white rounded-lg p-3 focus:ring-brand-blue focus:border-brand-blue"
          ></textarea>
        </div>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <button type="submit" disabled={loading} className="btn-success">
          {loading ? 'Guardando...' : 'Guardar Check-in'}
        </button>
      </form>
    </div>
  );
}