// app/api/riders/[id]/route.js

import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const token = req.cookies.get("cargorun_userToken")?.value;

  if (!token) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  const { id } = params;

  try {
    // Fetch order just to extract rider info (can be optimized if direct rider endpoint exists)
    const res = await fetch(
      `https://cargo-run-d699d9f38fb5.herokuapp.com/api/v1/order?riderId=${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();

    if (!res.ok || !data?.data?.length) {
      return NextResponse.json(
        { success: false, message: "Rider not found" },
        { status: 404 }
      );
    }

    const rider = data.data[0].riderId;
    return NextResponse.json({ success: true, data: rider });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
