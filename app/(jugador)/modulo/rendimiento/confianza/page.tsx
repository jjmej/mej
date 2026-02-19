
import React from 'react';
import ModulePageLayout from '@/components/common/ModulePageLayout';

export default function ConfianzaPage() {
  return (
    <ModulePageLayout
      backHref="/modulo/rendimiento"
      backLabel="Rendimiento"
      title="Confianza"
      emoji="💪"
    >
      <p>
        La autoconfianza se construye. Se basa en tu preparación, en tus logros pasados y en cómo te hablas a ti mismo. Vamos a trabajar en reforzar esa voz interior para que sea tu mayor aliada.
      </p>
       <button className="btn-primary">
        Ejercicio de Autodiálogo Positivo
      </button>
    </ModulePageLayout>
  );
}