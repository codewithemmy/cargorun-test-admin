// app/api/riders/[id]/orders/route.js

import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id } = params;

  // Get token from cookie or header in the incoming request
  const token = req.cookies.get("cargorun_userToken")?.value;

  if (!token) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const response = await fetch(
      `https://cargo-run-d699d9f38fb5.herokuapp.com/api/v1/order?riderId=${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { success: false, message: data.msg || "Failed to fetch orders" },
        { status: response.status }
      );
    }

    return NextResponse.json({ success: true, data: data.data });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
