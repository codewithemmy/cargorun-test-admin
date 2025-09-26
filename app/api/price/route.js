import { NextResponse } from "next/server";

export async function GET(req) {
  const token = req.cookies.get("cargorun_userToken")?.value;

  if (!token) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const res = await fetch(
      "https://cargo-run-d699d9f38fb5.herokuapp.com/api/v1/cargo-price",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { success: false, message: data.message || "Failed to fetch price" },
        { status: res.status }
      );
    }

    return NextResponse.json({ success: true, data: data.data });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
