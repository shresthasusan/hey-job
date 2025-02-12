"use client";
import React, { useEffect, useState } from "react";

const AdminSettingsPage = () => {
  const [settings, setSettings] = useState({
    maintenanceMode: false,
    notifications: true,
    selectedUserId: "",
    selectedRole: "",
  });

  const [users, setUsers] = useState<
    { _id: string; name: string; role: string }[]
  >([]);

  useEffect(() => {
    fetchSettings();
    fetchUsers();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/settings");
      const data = await res.json();
      setSettings((prev) => ({
        ...prev,
        maintenanceMode: data.maintenanceMode,
      }));
    } catch (error) {
      console.error("Error fetching settings:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/users"); // Assume an API for fetching users
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setSettings({ ...settings, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("/api/adminSettings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      alert("Settings updated!");
    } catch (error) {
      console.error("Error updating settings:", error);
    }
  };

  return (
    <div className="">
        <h1 className="text-5xl  align-middle text-center font-bold">Admin Settings</h1>
        <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-lg">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Maintenance Mode */}
        <div className="flex items-center">
          <input
            type="checkbox"
            name="maintenanceMode"
            checked={settings.maintenanceMode}
            onChange={handleChange}
            className="mr-2"
          />
          <label className="text-gray-700">Enable Maintenance Mode</label>
        </div>

        {/* Enable Notifications */}
        <div className="flex items-center">
          <input
            type="checkbox"
            name="notifications"
            checked={settings.notifications}
            onChange={handleChange}
            className="mr-2"
          />
          <label className="text-gray-700">Enable Notifications</label>
        </div>

        {/* User Role Management */}
        <div>
          <label className="block text-gray-700">Manage User Roles</label>
          <select
            name="selectedUserId"
            value={settings.selectedUserId}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Select User</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name} ({user.role})
              </option>
            ))}
          </select>
          <select
            name="selectedRole"
            value={settings.selectedRole}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-2"
          >
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="freelancer">Freelancer</option>
            <option value="client">Client</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded"
        >
          Save Changes
        </button>
      </form>
      </div>
    </div>
  );
};

export default AdminSettingsPage;
