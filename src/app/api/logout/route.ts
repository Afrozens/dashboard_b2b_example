import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import { AuthenticatedCookies } from '@/utils/auth';

export async function POST() {
  try {
    cookies().delete(AuthenticatedCookies.ACCESS);

    return NextResponse.json({
      success: true
    });
  } catch (error) {
    return NextResponse.json({ message: `invalid-logout-request-${error}` }, { status: 500 });
  }
}
