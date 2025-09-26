"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AdminChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setLoading(true);
    setMessage(null);
    setError(null);

    if (newPassword !== confirmPassword) {
      setError("New password and confirmation do not match");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/admin/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          oldPassword,
          newPassword,
          confirmPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to change password");
      }

      setMessage(data.message || "Password changed successfully");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Change Admin Password</h2>

      <Input
        type="password"
        placeholder="Old Password"
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
        className="mb-4"
        required={true}
      />

      <Input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className="mb-4"
        required={true}
      />

      <Input
        type="password"
        placeholder="Confirm New Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="mb-6"
      />

      <Button onClick={handleSubmit} disabled={loading}>
        {loading ? "Changing..." : "Change Password"}
      </Button>

      {message && <p className="mt-4 text-green-600">{message}</p>}
      {error && <p className="mt-4 text-red-600">{error}</p>}
    </div>
  );
}
