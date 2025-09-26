// app/api/price/[id]/route.js

import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  const token = req.cookies.get("cargorun_userToken")?.value;

  if (!token) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  const { id } = params;
  const body = await req.json();

  try {
    const res = await fetch(
      `https://cargo-run-d699d9f38fb5.herokuapp.com/api/v1/cargo-price/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      console.error("Remote API failure:", data);
      return NextResponse.json(
        { success: false, message: data.message || "Failed to update price" },
        { status: res.status }
      );
    }

    return NextResponse.json({ success: true, data: data.data });
  } catch (error) {
    console.error("Route handler error:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
