// app/riders/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

type Rider = {
  fullName: string;
  phone: string;
  profileImage: string | null;
  vehicle?: {
    brand: string;
    image?: string;
    plateNumber: string;
    vehicleType: string;
  };
};

export default function RiderDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [rider, setRider] = useState<Rider | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchRider = async () => {
      try {
        const res = await fetch(`/api/riders/${id}`);
        const json = await res.json();

        if (res.ok && json.data) {
          setRider(json.data);
        } else {
          setError(json.message || "Failed to fetch rider details");
        }
      } catch (err) {
        setError("Error fetching rider details");
      } finally {
        setLoading(false);
      }
    };

    fetchRider();
  }, [id]);

  if (loading)
    return <p className="text-center mt-10">Loading rider details...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <button
        onClick={() => router.back()}
        className="mb-6 text-blue-600 underline"
      >
        ← Back
      </button>

      <h1 className="text-2xl font-bold mb-4">Rider Details</h1>

      {rider && (
        <div className="bg-white shadow p-6 rounded-md">
          <div className="flex items-center gap-6 mb-6">
            <img
              src={rider.profileImage || "/images/rider_picture.png"}
              alt="Rider"
              className="w-24 h-24 rounded-full object-cover"
            />
            <div>
              <h2 className="text-xl font-semibold">{rider.fullName}</h2>
              <p className="text-gray-600">📞 {rider.phone}</p>
            </div>
          </div>

          {rider.vehicle && (
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Vehicle Information
              </h3>
              <p>
                <strong>Type:</strong> {rider.vehicle.vehicleType}
              </p>
              <p>
                <strong>Brand:</strong> {rider.vehicle.brand}
              </p>
              <p>
                <strong>Plate Number:</strong> {rider.vehicle.plateNumber}
              </p>

              {rider.vehicle.image && (
                <img
                  src={rider.vehicle.image}
                  alt="Vehicle"
                  className="mt-4 w-full max-w-sm rounded-md"
                />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
