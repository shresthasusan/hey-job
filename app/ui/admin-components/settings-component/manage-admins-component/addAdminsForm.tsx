"use client";

import { fetchWithAuth } from "@/app/lib/fetchWIthAuth";
import { Button } from "@/app/ui/button";
import Card from "@/app/ui/card";
import React, { useState } from "react";

const AddAdminsForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user_admin");

  const handleAddAdmin = async () => {
    try {
      await fetchWithAuth("/api/admins");

      setName("");
      setEmail("");
    } catch (error) {
      console.error("Error adding admin", error);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Manage Admins</h2>

      {/* Add Admin Form */}
      <Card className="mb-6">
        <h3 className="text-xl font-semibold mb-3">Add Admin</h3>
        <div className="grid grid-cols-3 gap-4">
          <input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded p-2 "
          />
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded p-2"
          />
          <select
            className="border p-2 rounded"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="user_admin">User Admin</option>
            <option value="super_admin">Super Admin</option>
          </select>
        </div>
        <Button className="mt-4" onClick={handleAddAdmin}>
          Add Admin
        </Button>
      </Card>
    </>
  );
};

export default AddAdminsForm;
