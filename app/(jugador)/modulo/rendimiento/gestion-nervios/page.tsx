
import React from 'react';
import ModulePageLayout from '@/components/common/ModulePageLayout';

export default function GestionNerviosPage() {
  return (
    <ModulePageLayout
      backHref="/modulo/rendimiento"
      backLabel="Rendimiento"
      title="Gestión de Nervios"
      emoji="🌬️"
    >
      <p>
        Los nervios antes de una competición son normales, ¡incluso buenos! El truco está en saber controlarlos. Descubre ejercicios de respiración y mentalización para transformar la ansiedad en energía.
      </p>
       <button className="btn-primary">
        Practicar Respiración Controlada
      </button>
    </ModulePageLayout>
  );
}