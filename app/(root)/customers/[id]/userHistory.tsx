"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

// --- Define Order Interface ---
interface Order {
  _id: string;
  orderId: string;
  status: string;
  trackingId: string;
  createdAt: string;
  // add more fields as needed
}

export default function UserOrderHistory() {
  const { id } = useParams();
  const router = useRouter(); // <-- Import useRouter here
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/customers/${id}/orders`)
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to fetch orders");
        const json = await res.json();
        setOrders(json.orders || []);
        setFilteredOrders(json.orders || []);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    const term = searchTerm.toLowerCase();
    setFilteredOrders(
      orders.filter(
        (order) =>
          order.orderId?.toLowerCase().includes(term) ||
          order.status?.toLowerCase().includes(term)
      )
    );
  }, [searchTerm, orders]);

  if (loading)
    return <p className="text-center py-10">Loading order history...</p>;
  if (error) return <p className="text-center py-10 text-red-500">{error}</p>;

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8">
      <Card className="mb-6">
        <CardHeader></CardHeader>
        <CardContent>
          <Input
            placeholder="Search by Order ID or Status"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-4"
          />
          {filteredOrders.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No orders found.</p>
          ) : (
            filteredOrders.map((order) => (
              <div
                key={order._id}
                onClick={() => router.push(`/orders/${order._id}`)}
                className="cursor-pointer border rounded-md p-4 shadow-sm mb-4 hover:bg-gray-50 transition"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    router.push(`/orders/${order._id}`);
                  }
                }}
              >
                <p>
                  <strong>Order ID:</strong> {order.orderId}
                </p>

                <p>
                  <strong>Tracking ID:</strong> {order.trackingId}
                </p>
                <p>
                  <strong>Created At:</strong>{" "}
                  {new Date(order.createdAt).toLocaleString()}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    className={`px-2 py-0.5 rounded text-sm font-medium ${
                      order.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : order.status === "cancelled"
                        ? "bg-red-100 text-red-800"
                        : order.status === "delivered"
                        ? "bg-green-100 text-green-800"
                        : order.status === "accepted"
                        ? "bg-blue-100 text-blue-800"
                        : order.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </p>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
