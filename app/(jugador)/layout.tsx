
import React from 'react';
import BottomNav from '@/components/jugador/BottomNav';

export default function JugadorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen bg-dark-bg">
      <main className="flex-grow container mx-auto p-4 pb-24">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
