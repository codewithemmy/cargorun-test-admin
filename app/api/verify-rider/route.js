// app/api/dashboard/route.js

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request) {
    const { filterId, verificationString } = await request.json();

    try {
//
    const userData = cookies().get('cargorun_userToken');
      
    const response = await fetch(`https://cargo-run-d699d9f38fb5.herokuapp.com/api/v1/rider/credential/${filterId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userData.value}`
      },
      body: {
        "verifiedCredentials" : verificationString
      }
    });
 
    if (!response.ok) {
      const errorResult = await response.json();
      return NextResponse.json({ error: errorResult.message || 'Failed to update verification' }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
