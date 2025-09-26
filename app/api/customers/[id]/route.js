import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request, { params }) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: "Customer ID is required" },
        { status: 400 }
      );
    }

    const userToken = cookies().get("cargorun_userToken");

    if (!userToken?.value) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Call external API with _id as a query param
    const response = await fetch(
      `https://cargo-run-d699d9f38fb5.herokuapp.com/api/v1/user/all?_id=${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken.value}`,
        },
      }
    );

    if (!response.ok) {
      const errorResult = await response.json();
      return NextResponse.json(
        { error: errorResult.message || "Failed to fetch customer" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
