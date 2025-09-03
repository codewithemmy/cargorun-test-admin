// app/api/signup/route.js

import { NextResponse } from 'next/server';

export async function POST(request) {
  const { name, email, password } = await request.json();
  
  try {
    const response = await fetch('https://cargo-run-d699d9f38fb5.herokuapp.com/api/v1/admin/sign-up', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    if (!response.ok) {
      throw new Error('Failed to sign up');
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
