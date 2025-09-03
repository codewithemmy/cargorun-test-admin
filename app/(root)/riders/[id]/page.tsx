"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

type Rider = {
  _id: string;
  fullName: string;
  verifiedCredentials: string;
  vehicle: {
    brand: string;
    plateNumber: string;
  };
  email: string;
  phone: string;
};

type User =
  | {
      name?: string;
      email?: string;
      token?: string;
      image?: string;
      id?: string; // Added id as it is used in the code
    }
  | "";

const Page: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const filterId = pathname.split("/")[2];
  const [data, setData] = useState<Rider | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [refire, setRefire] = useState(false);
  const [message, setMessage] = useState("");
  const [details, setDetails] = useState<User>("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/riders");
        const result = await response.json();

        if (response.ok) {
          const specificOrder = result.data.find(
            (item: Rider) => item._id === filterId
          );
          setData(specificOrder);
        } else {
          setError(result.error || "Failed to fetch data");
        }
      } catch (err) {
        setError("An error occurred");
      }
    };

    fetchData();
  }, [filterId, refire]);

  const updateVerification = async (verificationString: string) => {
    const userDataString = localStorage.getItem("cargorun_userData");
    if (userDataString) {
      const parsedObject = JSON.parse(userDataString) as User;
      setDetails(parsedObject);
      if (parsedObject !== "" && "token" in parsedObject) {
        setToken(parsedObject.token ?? "");
      }
    } else setMessage("You are not authorized to perform this action");
    const res = await fetch(
      `https://cargo-run-d699d9f38fb5.herokuapp.com/api/v1/rider/credential/${filterId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ verifiedCredentials: verificationString }),
      }
    );

    if (res.ok) return setRefire(true);
  };

  console.log(message);

  return (
    <div className="w-full bg-white min-h-screen mt-6 p-6">
      <div className="w-full py-6">
        <button onClick={() => router.back()}>
          <img src="/icons/arrow-left.svg" height={20} width={20} alt="back" />
        </button>
      </div>
      <div className="h-full flex flex-col mt-4 items-center">
        <img
          src="/images/rider_picture.png"
          alt="picture"
          height={139}
          width={139}
        />
        <h1 className="font-semibold text-2xl mt-2 flex items-center">
          {data?.fullName}{" "}
          {data?.verifiedCredentials == "verified" ? (
            <CircleCheckIcon className="h-6 w-6 text-primary-green ml-2" />
          ) : (
            <p className="italic ml-2 text-sm italicize font-thin">
              not verified
            </p>
          )}
        </h1>
        <p className="mt-2">
          <span className="text-xl font-thin">{data?.vehicle?.brand}</span> --{" "}
          <span className="text-sm font-semibold">
            {data?.vehicle.plateNumber}
          </span>
        </p>
        <p>{data?.email}</p>

        <img
          src="/images/rider_id.png"
          alt="rider_id"
          height={212}
          width={408}
          className="my-6"
        />

        <div className="flex flex-row items-center gap-4 mt-8">
          <button
            className="delivered px-4 py-2 rounded-lg text-white"
            disabled={loading}
            onClick={() => updateVerification("verified")}
          >
            Verify Credentials
          </button>
          <button
            className="bg-red-500 px-4 py-2 rounded-lg text-white"
            disabled={loading}
            onClick={() => updateVerification("rejected")}
          >
            Cancel Verification
          </button>
        </div>
        <div className="mt-10 items-center">
          <h1 className="text-xl font-semibold text-primary-blue text-center mb-4">
            Contact Details
          </h1>

          <div className="flex flex-row items-center justify-center gap-8">
            <div>
              <h1 className="font-semibold">Mobile</h1>
              <p>{data?.phone}</p>
            </div>
            <div>
              <h1 className="font-semibold">Home</h1>
              <p>{data?.phone}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

function CircleCheckIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
