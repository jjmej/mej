
import React from 'react';
import ModulePageLayout from '@/components/common/ModulePageLayout';

export default function PreparacionPartidosPage() {
  return (
    <ModulePageLayout
      backHref="/modulo/rendimiento"
      backLabel="Rendimiento"
      title="Preparación de Partidos"
      emoji="📅"
    >
      <p>
        Un buen rendimiento empieza mucho antes del pitido inicial. Aprende a crear rutinas pre-partido que te ayuden a llegar al momento clave con el cuerpo y la mente listos para competir al máximo.
      </p>
       <button className="btn-primary">
        Crear mi Rutina Pre-Partido
      </button>
    </ModulePageLayout>
  );
}