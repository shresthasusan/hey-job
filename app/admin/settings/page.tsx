"use client";

import React, { useEffect, useState } from "react";

const AdminSettingsPage = () => {
  const [settings, setSettings] = useState({
    maintenanceMode: false,
    notifications: true,
    darkMode: false,
    autoBackup: false,
    twoFactorAuth: false,
    apiKey: "************", // Masked for security
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
        darkMode: data.darkMode,
        autoBackup: data.autoBackup,
        twoFactorAuth: data.twoFactorAuth,
        apiKey: data.apiKey,
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
    <div className="flex flex-col flex-1 p-6 md:p-10 bg-white min-h-screen">
      {/* Heading */}
      <h1 className="text-4xl text-black-400 text-center md:text-left">
        Admin Settings
      </h1>

      {/* Settings Form */}
      <div className="max-w-4xl  p-6 bg-gray-50 shadow-lg rounded-lg mt-8">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Maintenance Mode */}
          <div className="flex items-center justify-between p-3 bg-white shadow rounded-lg">
            <label className="text-gray-700">Enable Maintenance Mode</label>
            <input
              type="checkbox"
              name="maintenanceMode"
              checked={settings.maintenanceMode}
              onChange={handleChange}
              className="w-5 h-5"
            />
          </div>

          {/* Enable Notifications */}
          <div className="flex items-center justify-between p-3 bg-white shadow rounded-lg">
            <label className="text-gray-700">Enable Notifications</label>
            <input
              type="checkbox"
              name="notifications"
              checked={settings.notifications}
              onChange={handleChange}
              className="w-5 h-5"
            />
          </div>

          {/* Dark Mode */}
          <div className="flex items-center justify-between p-3 bg-white shadow rounded-lg">
            <label className="text-gray-700">Enable Dark Mode</label>
            <input
              type="checkbox"
              name="darkMode"
              checked={settings.darkMode}
              onChange={handleChange}
              className="w-5 h-5"
            />
          </div>

          {/* Auto Backup */}
          <div className="flex items-center justify-between p-3 bg-white shadow rounded-lg">
            <label className="text-gray-700">Enable Auto Backup</label>
            <input
              type="checkbox"
              name="autoBackup"
              checked={settings.autoBackup}
              onChange={handleChange}
              className="w-5 h-5"
            />
          </div>

          {/* Two-Factor Authentication */}
          <div className="flex items-center justify-between p-3 bg-white shadow rounded-lg">
            <label className="text-gray-700">Enable Two-Factor Authentication</label>
            <input
              type="checkbox"
              name="twoFactorAuth"
              checked={settings.twoFactorAuth}
              onChange={handleChange}
              className="w-5 h-5"
            />
          </div>

          {/* API Key Management */}
          <div className="p-3 bg-white shadow rounded-lg">
            <label className="block text-gray-700">API Key</label>
            <input
              type="text"
              name="apiKey"
              value={settings.apiKey}
              disabled
              className="w-full p-2 border rounded mt-2 bg-gray-100 cursor-not-allowed"
            />
            <button className="mt-2 text-blue-500 hover:underline">
              Regenerate API Key
            </button>
          </div>

          {/* User Role Management */}
          <div className="p-3 bg-white shadow rounded-lg">
            <label className="block text-gray-700">Manage User Roles</label>
            <select
              name="selectedUserId"
              value={settings.selectedUserId}
              onChange={handleChange}
              className="w-full p-2 border rounded mt-2 bg-white"
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
              className="w-full p-2 border rounded mt-2 bg-white"
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
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminSettingsPage;
