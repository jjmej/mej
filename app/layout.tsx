// FIX: Import React to be in scope for React.ReactNode type.
import React from 'react';
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ['400', '600', '700']
});

export const metadata: Metadata = {
  title: "Mente en Juego",
  description: "Plataforma de bienestar mental para jóvenes deportistas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={poppins.className}>{children}</body>
    </html>
  );
}