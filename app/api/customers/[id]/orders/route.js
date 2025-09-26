// app/api/customers/[id]/orders/route.js
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const runtime = "edge";

export async function GET(request, { params }) {
  const { id } = params;
  const token = cookies().get("cargorun_userToken")?.value;

  try {
    const res = await fetch(
      "https://cargo-run-d699d9f38fb5.herokuapp.com/api/v1/order",
      {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        cache: "no-store",
      }
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch orders" },
        { status: res.status }
      );
    }

    const json = await res.json();
    const allOrders = json.data || [];
    const userOrders = allOrders.filter((order) => order.userId?._id === id);

    return NextResponse.json({ orders: userOrders }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
