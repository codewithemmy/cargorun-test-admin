"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

interface Transaction {
  _id: string;
  amount: number;
  status: string;
  createdAt: string;
  reference: string;
  paymentFor: string;
  orderId: string;
}

export default function RiderTransactionsPage() {
  const { id } = useParams();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [filters, setFilters] = useState({
    period: "",
    specificDate: "",
    startDate: "",
    endDate: "",
    amountSearch: "",
  });

  // Fetch whenever filters change
  useEffect(() => {
    if (!id) return;

    async function fetchTransactions() {
      try {
        setLoading(true);

        const query = new URLSearchParams();
        Object.entries(filters).forEach(([k, v]) => {
          if (v) query.set(k, v);
        });

        const res = await fetch(
          `/api/riders/${id}/transactions?${query.toString()}`
        );
        const json = await res.json();

        if (json.success) {
          setTransactions(json.transactions);
          setTotal(json.totalAmount);
        } else {
          setTransactions([]);
          setTotal(0);
        }
      } catch (err) {
        console.error(err);
        setTransactions([]);
        setTotal(0);
      } finally {
        setLoading(false);
      }
    }

    fetchTransactions();
  }, [id, filters]);

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Rider Transactions</h1>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Period</label>
          <select
            className="border p-2 rounded w-full"
            value={filters.period}
            onChange={(e) => setFilters({ ...filters, period: e.target.value })}
          >
            <option value="">Select Period</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Specific Date
          </label>
          <input
            type="date"
            className="border p-2 rounded w-full"
            value={filters.specificDate}
            onChange={(e) =>
              setFilters({ ...filters, specificDate: e.target.value })
            }
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Search by Amount
          </label>
          <input
            type="number"
            placeholder="Enter Amount ₦"
            className="border p-2 rounded w-full"
            value={filters.amountSearch}
            onChange={(e) =>
              setFilters({ ...filters, amountSearch: e.target.value })
            }
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Start Date</label>
          <input
            type="date"
            className="border p-2 rounded w-full"
            value={filters.startDate}
            onChange={(e) =>
              setFilters({ ...filters, startDate: e.target.value })
            }
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">End Date</label>
          <input
            type="date"
            className="border p-2 rounded w-full"
            value={filters.endDate}
            onChange={(e) =>
              setFilters({ ...filters, endDate: e.target.value })
            }
          />
        </div>
      </div>

      {/* Total */}
      <div className="mb-4">
        <p className="font-semibold">Total Amount: ₦{total.toLocaleString()}</p>
      </div>

      {/* Results */}
      {loading ? (
        <p>Loading...</p>
      ) : transactions.length === 0 ? (
        <p className="text-gray-500">No transactions found</p>
      ) : (
        <ul className="space-y-4">
          {transactions.map((tx) => (
            <li key={tx._id} className="border p-4 rounded shadow-sm">
              <p>
                <strong>Tx ID:</strong> {tx._id}
              </p>
              <p>
                <strong>Order ID:</strong> {tx.orderId}
              </p>
              <p>
                <strong>Amount:</strong> ₦{tx.amount.toLocaleString()}
              </p>
              <p>
                <strong>Status:</strong> {tx.status}
              </p>
              <p>
                <strong>Reference:</strong> {tx.reference}
              </p>
              <p>
                <strong>Type:</strong> {tx.paymentFor}
              </p>
              <p>
                <strong>Date:</strong> {new Date(tx.createdAt).toLocaleString()}
              </p>
              <p>
                <Link
                  href={`/orders/${tx.orderId}`}
                  className="mt-3 block border p-4 rounded mb-4 shadow-sm bg-green-500 text-white font-bold hover:bg-green-700 transition"
                >
                  View Order Details
                </Link>
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
