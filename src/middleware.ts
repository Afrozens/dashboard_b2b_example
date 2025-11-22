import { NextResponse, type NextRequest } from 'next/server';

import { AuthenticatedCookies } from '@/utils/auth';

export function middleware(req: NextRequest) {
  const token = req.cookies.get(AuthenticatedCookies.ACCESS)?.value;
  const isCorrectlyToken = token && token.startsWith('mock_jwt_token_');
  const publicRoutes = ['/login'];
  
  const isPublicRoute = publicRoutes.some((route) => req.nextUrl.pathname === route);

    if (req.nextUrl.pathname === '/') {
      return NextResponse.redirect(new URL('/login', req.url));
    }

  if (req.nextUrl.pathname === '/login' && isCorrectlyToken) {
    return NextResponse.redirect(new URL('/dashboard/home', req.url));
  }

  if (!isCorrectlyToken && !isPublicRoute) {
    const loginUrl = new URL('/login', req.url);
    
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)', '/', '/dashboard/user/:path', '/dashboard/:path'],
};