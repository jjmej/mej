
import React from 'react';
import ModulePageLayout from '@/components/common/ModulePageLayout';

export default function MotivacionPage() {
  return (
    <ModulePageLayout
      backHref="/modulo/rendimiento"
      backLabel="Rendimiento"
      title="Motivación"
      emoji="🔥"
    >
      <p>
        Habrá días en que la motivación flaquee. Es importante entender qué te impulsa y tener claras tus metas. Aquí encontrarás estrategias para mantener la llama encendida, incluso en los momentos difíciles.
      </p>
       <button className="btn-primary">
        Definir Mis Metas
      </button>
    </ModulePageLayout>
  );
}