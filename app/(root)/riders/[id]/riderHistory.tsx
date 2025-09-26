//riders/[id]/riderHistory.tsx

"use client";

import { useEffect, useState, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Order {
  _id: string;
  orderId: string;
  trackingId: string;
  amount: number;
  price: number;
  deliveryFee: number;
  status: string;
  paymentStatus: string;
  createdAt: string;
  userId: {
    fullName: string;
    phone: string;
    email: string;
  };
}

export default function RiderOrderHistoryPage() {
  const { id } = useParams();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`/api/riderhistory/${id}`);
        const json = await res.json();

        if (!res.ok) {
          throw new Error(json.message || "Failed to fetch orders");
        }

        // setOrders(json.data || []);
        setOrders(
          (json.data || []).sort(
            (a: Order, b: Order) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
        );
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [id]);

  // Filter orders based on search input (case-insensitive)
  const filteredOrders = useMemo(() => {
    if (!search.trim()) return orders;

    const lowerSearch = search.toLowerCase();

    return orders.filter(
      (order) =>
        order.orderId.toLowerCase().includes(lowerSearch) ||
        order.trackingId.toLowerCase().includes(lowerSearch) ||
        order.userId.fullName.toLowerCase().includes(lowerSearch)
    );
  }, [orders, search]);

  if (loading)
    return <p className="text-center py-10">Loading rider history...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Rider Order History</CardTitle>
          <input
            type="text"
            placeholder="Search orders by ID, tracking ID or customer name"
            className="mt-2 w-full border rounded p-2"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </CardHeader>
        <CardContent>
          {filteredOrders.length === 0 ? (
            <p className="text-gray-500 text-center">No orders found.</p>
          ) : (
            filteredOrders.map((order) => (
              <Link
                key={order._id}
                href={`/orders/${order._id}`}
                className="block border p-4 rounded mb-4 shadow-sm hover:bg-gray-50 transition"
              >
                <span>
                  <p>
                    <strong>Order ID:</strong> {order.orderId}
                  </p>
                  <p>
                    <strong>Tracking ID:</strong> {order.trackingId}
                  </p>
                  <p>
                    <strong>Status:</strong>{" "}
                    <span className="capitalize">{order.status}</span>
                  </p>
                  <p>
                    <strong>Payment Status:</strong>{" "}
                    <span className="capitalize">{order.paymentStatus}</span>
                  </p>
                  <p>
                    <strong>Total:</strong> ₦{order.price.toLocaleString()}
                  </p>
                  <p>
                    <strong>Delivery Fee:</strong> ₦
                    {order.deliveryFee.toLocaleString()}
                  </p>
                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                  <p>
                    <strong>Customer:</strong> {order.userId.fullName} (
                    {order.userId.phone})
                  </p>
                </span>
              </Link>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
