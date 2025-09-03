// app/api/logout/route.js

import { NextResponse } from 'next/server';

export async function POST(request) {

  try {
    // Clear the cookie
    const response = NextResponse.json({ message: 'Logged out' }, { status: 200 });
    response.cookies.set('cargorun_userToken', '', { maxAge: -1 });
    response.cookies.set('cargorun_userData', '', { maxAge: -1 });

    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
