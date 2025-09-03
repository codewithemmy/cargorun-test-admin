// app/api/signin/route.js

import { NextResponse } from 'next/server';

export async function POST(request) {
  const { email, password } = await request.json();
  
  try {
    const response = await fetch('https://cargo-run-d699d9f38fb5.herokuapp.com/api/v1/admin/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Failed to sign in');
    }

    const data = await response.json();

    const res = NextResponse.json(data, { status: 200 });
    res.cookies.set('cargorun_userToken', data.data.token, { httpOnly: true, secure: true, sameSite: 'strict', maxAge: 60 * 60 * 24 });
    res.cookies.set('cargorun_userData', JSON.stringify(data.data), {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 // 1 day
    });
    return res
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
