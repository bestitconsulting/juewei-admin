import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { supabase } from './lib/supabase'
import { logger } from './lib/logger'
import { AuthenticationError } from './lib/errors'

// Define route patterns
const publicRoutes = [
  '/',
  '/products',
  '/products/[id]',
  '/categories',
  '/categories/[slug]',
  '/auth/login',
  '/auth/register',
  '/auth/forgot-password',
  '/auth/reset-password',
]

const authRoutes = [
  '/auth/login',
  '/auth/register',
  '/auth/forgot-password',
  '/auth/reset-password',
]

const protectedRoutes = [
  '/dashboard',
  '/profile',
  '/addresses',
  '/orders',
  '/cart',
  '/checkout',
]

const adminRoutes = [
  '/admin',
]

// Helper function to check if route matches pattern
function matchesRoute(pathname: string, patterns: string[]): boolean {
  return patterns.some(pattern => {
    if (pattern.includes('[') && pattern.includes(']')) {
      // Dynamic route pattern
      const regex = new RegExp(pattern.replace(/\[.*?\]/g, '[^/]+'))
      return regex.test(pathname)
    }
    return pathname === pattern || pathname.startsWith(pattern + '/')
  })
}

// Helper function to get user from request
async function getUserFromRequest(request: NextRequest) {
  try {
    const token = request.cookies.get('sb-access-token')?.value ||
                  request.headers.get('authorization')?.replace('Bearer ', '')

    if (!token) {
      return null
    }

    const { data: { user }, error } = await supabase.auth.getUser(token)

    if (error || !user) {
      return null
    }

    return user
  } catch (error) {
    logger.error('Failed to get user from request', error as Error)
    return null
  }
}

// Helper function to check if user is admin
async function isAdmin(user: any): Promise<boolean> {
  try {
    // This would typically check a user role in the database
    // For now, we'll use a simple check based on email domain
    return user?.email?.endsWith('@juewei.com') || false
  } catch (error) {
    logger.error('Failed to check admin status', error as Error)
    return false
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const startTime = Date.now()

  // Log request
  logger.info('Request received', {
    method: request.method,
    pathname,
    userAgent: request.headers.get('user-agent'),
    ip: request.ip || request.headers.get('x-forwarded-for'),
  })

  try {
    // Check if route is public
    if (matchesRoute(pathname, publicRoutes)) {
      // For auth routes, redirect if already authenticated
      if (matchesRoute(pathname, authRoutes)) {
        const user = await getUserFromRequest(request)
        if (user) {
          logger.info('Redirecting authenticated user from auth route', { pathname, userId: user.id })
          return NextResponse.redirect(new URL('/dashboard', request.url))
        }
      }

      // Allow public routes
      const response = NextResponse.next()
      response.headers.set('x-response-time', `${Date.now() - startTime}ms`)
      return response
    }

    // Check if route is protected
    if (matchesRoute(pathname, protectedRoutes) || matchesRoute(pathname, adminRoutes)) {
      const user = await getUserFromRequest(request)

      if (!user) {
        logger.warn('Unauthenticated access to protected route', { pathname })
        return NextResponse.redirect(new URL('/auth/login', request.url))
      }

      // Check admin routes
      if (matchesRoute(pathname, adminRoutes)) {
        const isAdminUser = await isAdmin(user)
        if (!isAdminUser) {
          logger.warn('Non-admin access to admin route', { pathname, userId: user.id })
          return NextResponse.redirect(new URL('/dashboard', request.url))
        }
      }

      // Add user info to headers for API routes
      const response = NextResponse.next()
      response.headers.set('x-user-id', user.id)
      response.headers.set('x-user-email', user.email || '')
      response.headers.set('x-response-time', `${Date.now() - startTime}ms`)

      return response
    }

    // For API routes, check authentication
    if (pathname.startsWith('/api/')) {
      // Skip auth for public API routes
      const publicApiRoutes = [
        '/api/auth/',
        '/api/products',
        '/api/categories',
        '/api/webhooks/',
      ]

      const isPublicApi = publicApiRoutes.some(route => pathname.startsWith(route))
      
      if (!isPublicApi) {
        const user = await getUserFromRequest(request)
        if (!user) {
          logger.warn('Unauthenticated API access', { pathname })
          return NextResponse.json(
            { error: 'Authentication required' },
            { status: 401 }
          )
        }

        // Check admin API routes
        if (pathname.startsWith('/api/admin/')) {
          const isAdminUser = await isAdmin(user)
          if (!isAdminUser) {
            logger.warn('Non-admin API access', { pathname, userId: user.id })
            return NextResponse.json(
              { error: 'Admin access required' },
              { status: 403 }
            )
          }
        }
      }
    }

    // Default: allow request
    const response = NextResponse.next()
    response.headers.set('x-response-time', `${Date.now() - startTime}ms`)
    return response

  } catch (error) {
    logger.error('Middleware error', error as Error, { pathname })
    
    // Return error response for API routes
    if (pathname.startsWith('/api/')) {
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      )
    }

    // Redirect to error page for non-API routes
    return NextResponse.redirect(new URL('/error', request.url))
  }
}

// Configure which routes the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
}
