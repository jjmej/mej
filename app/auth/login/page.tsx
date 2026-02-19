
import React from 'react';
import { login } from './actions'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

// Un componente para mostrar mensajes al usuario, con estilo condicional para éxito o error.
const Messages = ({ message, type }: { message: string | null, type: string | null }) => {
  if (!message) return null;
  const isSuccess = type === 'success';
  const bgColor = isSuccess ? 'bg-green-900/50' : 'bg-red-900/50';
  const borderColor = isSuccess ? 'border-green-500' : 'border-red-500';
  const textColor = isSuccess ? 'text-green-300' : 'text-red-300';
  
  return (
    <div className={`p-4 ${bgColor} border ${borderColor} ${textColor} rounded-lg text-center`}>
      <p>{decodeURIComponent(message)}</p>
    </div>
  )
}

export default async function LoginPage({ searchParams }: { searchParams: { message: string | null, type: string | null } }) {
  const supabase = createClient()
  const { data: { session } } = await supabase.auth.getSession()

  if (session) {
    redirect('/')
  }

  return (
    <div className="min-h-screen bg-dark-bg flex flex-col items-center justify-center p-4 text-center">
        <div className="max-w-md w-full space-y-4">
            <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Iniciar Sesión</h1>
                <p className="text-md sm:text-lg text-slate-300">Bienvenido/a de vuelta a Mente en Juego</p>
            </div>
            
            {searchParams.message && <Messages message={searchParams.message} type={searchParams.type} />}

            <form action={login} className="w-full space-y-4">
                <label className="sr-only" htmlFor="email">Email</label>
                <input
                    className="w-full bg-dark-card border border-slate-600 text-white rounded-lg p-3 text-center text-base sm:text-lg"
                    name="email"
                    placeholder="email@ejemplo.com"
                    required
                />
                <label className="sr-only" htmlFor="password">Contraseña</label>
                <input
                    className="w-full bg-dark-card border border-slate-600 text-white rounded-lg p-3 text-center text-base sm:text-lg"
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    required
                />
                <button type="submit" className="btn-primary !mt-6">
                    Entrar
                </button>
            </form>
            <p className="mt-4">
                ¿No tienes cuenta? <a href="/auth/register" className="text-brand-blue underline">Regístrate</a>
            </p>
        </div>
    </div>
  )
}