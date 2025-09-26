"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function UpdateCargoPricePage() {
  const [priceId, setPriceId] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const res = await fetch("/api/price");
        const json = await res.json();

        if (res.ok && json.data.length > 0) {
          setPrice(json.data[0].price);
          setPriceId(json.data[0]._id);
        } else {
          setMessage(json.message || "Failed to load price");
        }
      } catch {
        setMessage("Error fetching price");
      }
    };

    fetchPrice();
  }, []);

  const handleUpdate = async () => {
    if (!priceId || !price) {
      setMessage("Price ID or new price is missing");
      return;
    }

    setLoading(true);
    setMessage("");
    setSuccess(false);

    try {
      const res = await fetch(`/api/price/${priceId}`, {
        method: "PUT", // Updated to PUT
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ price }),
      });

      const text = await res.text();

      let json;
      try {
        json = JSON.parse(text);
      } catch {
        throw new Error("Unexpected server response: " + text);
      }

      if (res.ok) {
        setSuccess(true);
        setMessage("Price updated successfully!");
      } else {
        throw new Error(json.message || "Update failed");
      }
    } catch (err: any) {
      setSuccess(false);
      setMessage(err.message || "Update request failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 mt-10 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Current Price: {price}</h1>

      <hr />
      <hr />
      <br />

      <h1 className="text-2xl font-bold mb-4">Update Cargo Price</h1>

      <Input
        type="number"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
        className="mb-4"
        placeholder="Enter new price"
      />

      <Button onClick={handleUpdate} disabled={loading}>
        {loading ? "Updating..." : "Update Price"}
      </Button>

      {message && (
        <p
          className={`mt-4 text-sm ${
            success ? "text-green-600" : "text-red-500"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
