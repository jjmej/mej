
// FIX: Import React to be in scope for React.ReactNode type.
import React from 'react';
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { UserProvider } from '@/context/UserContext';

const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ['400', '600', '700']
});

export const metadata: Metadata = {
  title: "Mente en Juego",
  description: "Plataforma de bienestar mental para jóvenes deportistas.",
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full bg-dark-bg">
      <body className={`${poppins.className} h-full text-dark-text antialiased`}>
        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  );
}