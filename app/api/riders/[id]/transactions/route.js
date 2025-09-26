//app/api/riders/[id]/transactions/route.js

import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req, { params }) {
  const { id } = params;
  const { searchParams } = new URL(req.url);

  const token = cookies().get("cargorun_userToken")?.value;

  if (!token) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    // Build backend URL
    const url = new URL(
      "https://cargo-run-d699d9f38fb5.herokuapp.com/api/v1/transaction/rider-history"
    );
    url.searchParams.set("riderId", id);

    // Forward all filters from frontend
    searchParams.forEach((value, key) => {
      url.searchParams.set(key, value);
    });

    const response = await fetch(url.toString(), {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { success: false, message: data.msg || "Failed to fetch transactions" },
        { status: response.status }
      );
    }

    // Normalize response for frontend
    return NextResponse.json({
      success: true,
      transactions: data.data?.transactions || [],
      totalAmount: data.data?.totalAmount || 0,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
