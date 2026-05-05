import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  // 1. Configurar el cliente de Supabase para el Middleware
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) { return request.cookies.get(name)?.value },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options })
          response = NextResponse.next({ request: { headers: request.headers } })
          response.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: '', ...options })
          response = NextResponse.next({ request: { headers: request.headers } })
          response.cookies.set({ name, value: '', ...options })
        },
      },
    }
  )

  // 2. Obtener la sesión del usuario
  const { data: { user } } = await supabase.auth.getUser()

  // 3. Lógica de "Gatekeeper" (Protección de rutas)
  const isAcademyRoute = request.nextUrl.pathname.startsWith('/academy')

  if (isAcademyRoute && !user) {
    // Si intenta entrar a la academia sin estar logueado
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Aquí es donde en el futuro consultaremos el 'plan_type' en la base de datos
  // Por ahora, dejamos el camino libre si hay usuario
  return response
}

// Configurar en qué rutas se ejecuta el middleware
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}