import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Usamos la nueva convención de función 'proxy'
export function proxy(request: NextRequest) {
  // Simplemente dejamos pasar la petición para validar que la web cargue
  return NextResponse.next()
}

// El matcher indica qué rutas pasan por este filtro
export const config = {
  matcher: [
    /*
     * Coincide con todas las rutas excepto:
     * - api (rutas de API)
     * - _next/static (archivos estáticos)
     * - _next/image (optimización de imágenes)
     * - favicon.ico (icono de la pestaña)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}