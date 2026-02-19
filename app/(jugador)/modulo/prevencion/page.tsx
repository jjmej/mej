
import React from 'react';
import ModulePageLayout from '@/components/common/ModulePageLayout';
import Link from 'next/link';

export default function PrevencionScreeningPage() {
  return (
    <ModulePageLayout
      backHref="/dashboard"
      backLabel="Inicio"
      title="Prevención y Detección"
      emoji="🟡"
    >
      <p>
        Este es un cuestionario confidencial para ayudarnos a detectar posibles áreas de dificultad. Tus respuestas son privadas y nos sirven para ofrecerte la mejor ayuda posible.
      </p>
      <p className="text-sm text-slate-400">
        Contesta con honestidad. No hay respuestas correctas o incorrectas.
      </p>
      <Link href="#" className="btn-warning block text-center">
        Comenzar Cuestionario
      </Link>
    </ModulePageLayout>
  );
}