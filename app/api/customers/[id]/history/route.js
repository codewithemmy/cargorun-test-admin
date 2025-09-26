import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request, { params }) {
  const { id } = params;

  try {
    const token = cookies().get("cargorun_userToken")?.value;

    const res = await fetch(
      "https://cargo-run-d699d9f38fb5.herokuapp.com/api/v1/order",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
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
    const orders = json.data || [];

    // Filter orders for the given customer ID
    const userOrders = orders.filter((order) => order.userId?._id === id);

    const totalOrders = userOrders.length;
    const completedDeliveries = userOrders.filter(
      (order) => order.status === "delivered"
    ).length;

    return NextResponse.json(
      {
        totalOrders,
        completedDeliveries,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
