import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import { AuthenticatedCookies } from '@/utils/auth';
import { SignInResponse } from '@/models/auth';

export async function POST(request: NextRequest) {
  try {
    const data: SignInResponse = await request.json();

    if (!data.accessToken) {
      return NextResponse.json({ message: 'missing-auth-data' }, { status: 404 });
    }

    cookies().set({
      name: AuthenticatedCookies.ACCESS,
      value: data.accessToken,
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      maxAge: data.expiresIn,
      path: '/',
      sameSite: 'lax',
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ message: `invalid-auth-reques-${error}` }, { status: 500 });
  }
}
