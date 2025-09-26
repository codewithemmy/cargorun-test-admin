"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { shortenString } from "@/utils";
import Customer from "../page";
import UserOrderHistory from "./userHistory";

interface Customer {
  _id: string;
  fullName: string;
  isVerified: boolean;
  email: string;
  phone: string;
  address?: string;
  createdAt: string;
  walletBalance?: number;
}

interface CustomerActivity {
  totalOrders: number;
  completedDeliveries: number;
}

export default function CustomerDetailsPage() {
  const params = useParams();
  const id = params?.id as string;

  const [customer, setCustomer] = useState<Customer | null>(null);
  const [activity, setActivity] = useState<CustomerActivity>({
    totalOrders: 0,
    completedDeliveries: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch customer profile
  useEffect(() => {
    const fetchCustomer = async () => {
      if (!id) return;

      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`/api/customers/${id}`);

        if (!res.ok) {
          throw new Error(`Failed to fetch customer: ${res.status}`);
        }

        const result = await res.json();

        const customerData = Array.isArray(result.data)
          ? result.data[0]
          : result.data;

        if (!customerData || !customerData._id) {
          throw new Error("Customer not found.");
        }

        setCustomer(customerData);
      } catch (err: any) {
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchCustomer();
  }, [id]);

  // Fetch activity stats (total orders, completed deliveries)
  useEffect(() => {
    const fetchActivity = async () => {
      if (!id) return;

      try {
        const res = await fetch(`/api/customers/${id}/history`);
        if (!res.ok) throw new Error("Failed to fetch activity data");

        const data = await res.json();
        setActivity({
          totalOrders: data.totalOrders || 0,
          completedDeliveries: data.completedDeliveries || 0,
        });
      } catch (err) {
        console.error("Activity fetch error:", err);
      }
    };

    fetchActivity();
  }, [id]);

  if (loading) {
    return <p className="text-center py-10">Loading customer details...</p>;
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-500 font-semibold">
        {error}
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="text-center py-10 text-gray-600">Customer not found.</div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8">
      {/* Header */}
      <Card className="mb-6 shadow-md">
        <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between">
          <CardTitle className="text-2xl font-bold">
            {customer.fullName}
          </CardTitle>
          <span className="text-sm text-gray-500">
            ID: {shortenString(customer._id)}
          </span>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            {customer.email} • {customer.phone}
          </p>
        </CardContent>
      </Card>

      {/* Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Profile Info */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-gray-700">
            <p>
              <strong>Full Name:</strong> {customer.fullName}
            </p>
            <p>
              <strong>Verified:</strong> {customer.isVerified ? "Yes" : "No"}
            </p>
            <p>
              <strong>Email:</strong> {customer.email}
            </p>
            <p>
              <strong>Phone:</strong> {customer.phone}
            </p>
            <p>
              <strong>Address:</strong> {customer.address || "Not provided"}
            </p>
            <p>
              <strong>Joined:</strong>{" "}
              {new Date(customer.createdAt).toLocaleDateString()}
            </p>
          </CardContent>
        </Card>

        {/* Activity */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Customer Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-gray-700">
            <p>
              <strong>Total Orders:</strong> {activity.totalOrders}
            </p>
            <p>
              <strong>Completed Deliveries:</strong>{" "}
              {activity.completedDeliveries}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6 shadow-md mt-6 p-4">
        <CardTitle className="text-2xl font-bold capitalize">
          {customer.fullName} Order History
        </CardTitle>
        {/* Import Here */}
        <UserOrderHistory />
      </Card>
    </div>
  );
}
