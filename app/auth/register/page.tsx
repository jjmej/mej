
import { signup } from './actions'
import RegisterForm from '@/components/auth/RegisterForm'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function RegisterPage() {
    const supabase = createClient()
    const { data: { session } } = await supabase.auth.getSession()

    if (session) {
        redirect('/')
    }

    return (
        <div className="min-h-screen bg-dark-bg flex flex-col items-center justify-center p-4 text-center">
            <div className="max-w-md w-full">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Crea tu Cuenta</h1>
                <p className="text-lg text-slate-300 mb-8">Únete a Mente en Juego</p>
                <RegisterForm action={signup} />
                 <p className="mt-4">
                    ¿Ya tienes cuenta? <a href="/auth/login" className="text-brand-blue underline">Inicia Sesión</a>
                </p>
            </div>
        </div>
    )
}
