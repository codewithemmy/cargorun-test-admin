import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();

    const token = cookies().get("cargorun_userToken")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Not Authorized: No token" },
        { status: 401 }
      );
    }

    const res = await fetch(
      "https://cargo-run-d699d9f38fb5.herokuapp.com/api/v1/admin/change-password",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { success: false, message: data.message || "Password change failed" },
        { status: res.status }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
