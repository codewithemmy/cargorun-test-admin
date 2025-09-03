// app/api/signin/route.js

import { NextResponse } from 'next/server';

export async function POST(request) {
  const { email } = await request.json();
  
  try {
    const response = await fetch('https://cargo-run-d699d9f38fb5.herokuapp.com/api/v1/admin/forgot-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      throw new Error('Error fetching link');
    }

    const data = await response.json();

    const res = NextResponse.json(data, { status: 200 });
    return res
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
