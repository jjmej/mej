
'use client'
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HomeIcon, ChartBarIcon, SparklesIcon, Cog6ToothIcon, BookOpenIcon } from '@heroicons/react/24/outline';

const navItems = [
  { href: '/dashboard', icon: HomeIcon, label: 'Inicio' },
  { href: '/evolucion', icon: ChartBarIcon, label: 'Evolución' },
  { href: '/biblioteca', icon: BookOpenIcon, label: 'Biblioteca' },
  { href: '/logros', icon: SparklesIcon, label: 'Logros' },
  { href: '/configuracion', icon: Cog6ToothIcon, label: 'Ajustes' },
];

const BottomNav: React.FC = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-dark-card border-t border-slate-700 shadow-lg">
      <div className="flex justify-around max-w-lg mx-auto">
        {navItems.map((item) => {
           const isActive = pathname === item.href;
           return (
            <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center w-full pt-2 pb-1 text-xs ${
                    isActive ? 'text-brand-blue' : 'text-slate-400'
                }`}
            >
                <item.icon className="h-6 w-6 mb-1" />
                <span>{item.label}</span>
            </Link>
           )
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
