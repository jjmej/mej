
import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'
import { createClient } from '@/lib/supabase/server' // Usamos el server para no depender de la request/response

export async function middleware(request: NextRequest) {
  const response = await updateSession(request)

  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: profile } = await supabase
    .from('profiles')
    .select('rol')
    .single()

  const { pathname } = request.nextUrl

  if (!user && !pathname.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  if (user) {
    if (pathname.startsWith('/auth')) {
       return NextResponse.redirect(new URL('/', request.url))
    }
    if (pathname.startsWith('/(jugador)') && profile?.rol !== 'jugador') {
      return NextResponse.redirect(new URL('/', request.url))
    }
    if (pathname.startsWith('/(entrenador)') && profile?.rol !== 'entrenador') {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
