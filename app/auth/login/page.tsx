import { login } from './actions'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function LoginPage() {
  const supabase = createClient()
  const { data: { session } } = await supabase.auth.getSession()

  if (session) {
    redirect('/')
  }

  return (
    <div className="min-h-screen bg-dark-bg flex flex-col items-center justify-center p-4 text-center">
        <div className="max-w-md w-full">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Iniciar Sesión</h1>
            <p className="text-lg text-slate-300 mb-8">Bienvenido/a de vuelta a Mente en Juego</p>
            {/* FIX: The form 'action' prop was causing a type error. Using 'formAction' on the button instead. */}
            <form className="w-full space-y-4">
                <label className="sr-only" htmlFor="email">Email</label>
                <input
                    className="w-full bg-dark-card border border-slate-600 text-white rounded-lg p-3 text-center text-lg"
                    name="email"
                    placeholder="email@ejemplo.com"
                    required
                />
                <label className="sr-only" htmlFor="password">Contraseña</label>
                <input
                    className="w-full bg-dark-card border border-slate-600 text-white rounded-lg p-3 text-center text-lg"
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    required
                />
                <button type="submit" formAction={login} className="w-full bg-brand-blue hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg text-xl transition-colors !mt-6">
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