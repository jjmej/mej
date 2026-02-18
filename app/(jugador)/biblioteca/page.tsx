
import React from 'react';
import { PlayCircleIcon } from '@heroicons/react/24/solid';

const audios = [
  { title: "Visualización Pre-Competición", duration: "5 min", description: "Guía para imaginar tu rendimiento ideal y aumentar tu confianza antes de un partido importante." },
  { title: "Relajación Muscular Progresiva", duration: "8 min", description: "Aprende a tensar y relajar tus músculos para liberar el estrés físico acumulado tras un entrenamiento duro." },
  { title: "Mindfulness para Deportistas", duration: "3 min", description: "Un ejercicio corto para conectar con el presente, ideal para hacer justo antes de salir a calentar." },
  { title: "Gestión de la Frustración", duration: "4 min", description: "Audio para escuchar después de un error o un mal resultado, te ayudará a procesar la emoción y a seguir adelante." },
];

export default function BibliotecaPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-white">Biblioteca de Audios</h1>
            <p className="text-slate-300">Audios cortos para ayudarte en diferentes momentos. (Funcionalidad simulada)</p>
            <div className="space-y-4">
                {audios.map((audio, index) => (
                    <div key={index} className="bg-dark-card p-4 rounded-lg flex items-center gap-4">
                        <PlayCircleIcon className="w-12 h-12 text-brand-blue flex-shrink-0" />
                        <div className="flex-grow">
                            <h2 className="font-bold text-white">{audio.title}</h2>
                            <p className="text-sm text-slate-400">{audio.duration}</p>
                            <p className="text-sm text-slate-300 mt-1">{audio.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
