"use client";

import { fetchWithAuth } from "@/app/lib/fetchWIthAuth";
import { Button } from "@/app/ui/button";

import Card from "@/app/ui/card";
import React, { useEffect, useState } from "react";

interface Admin {
  _id: string;
  name: string;
  email: string;
  role: string;
}

export default function ManageUsers() {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user_admin");

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const res = await fetchWithAuth("/api/admins");
      const data = await res.json();
      setAdmins(data);
    } catch (error) {
      console.error("Error fetching admins", error);
    }
  };

  const handleAddAdmin = async () => {
    try {
      await fetchWithAuth("/api/admins");
      fetchAdmins();
      setName("");
      setEmail("");
    } catch (error) {
      console.error("Error adding admin", error);
    }
  };

  const handleDeleteAdmin = async (adminId: string) => {
    try {
      await fetchWithAuth(`/api/admins/${adminId}`);
      fetchAdmins();
    } catch (error) {
      console.error("Error deleting admin", error);
    }
  };

  const handlePromoteToSuperAdmin = async (adminId: string) => {
    try {
      await fetchWithAuth(`/api/admins/${adminId}`);
      fetchAdmins();
    } catch (error) {
      console.error("Error promoting admin", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Admins</h2>

      {/* Add Admin Form */}
      <Card className="mb-6">
        <h3 className="text-xl font-semibold mb-3">Add Admin</h3>
        <div className="grid grid-cols-3 gap-4">
          <input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

      {/* Admin List Table */}
      <Card>
        <>
          <h3 className="text-xl font-semibold mb-3">Admin List</h3>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin) => (
                <tr key={admin._id}>
                  <td>{admin.name}</td>
                  <td>{admin.email}</td>
                  <td>{admin.role}</td>
                  <td>
                    {admin.role !== "super_admin" && (
                      <Button
                        onClick={() => handlePromoteToSuperAdmin(admin._id)}
                        className="mr-2"
                      >
                        Promote
                      </Button>
                    )}
                    <Button onClick={() => handleDeleteAdmin(admin._id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      </Card>
    </div>
  );
}
