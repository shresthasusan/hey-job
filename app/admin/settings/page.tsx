"use client";

import { fetchWithAuth } from "@/app/lib/fetchWIthAuth";
import React, { useState } from "react";

const AdminSettingsPage = () => {
  const [settings, setSettings] = useState({
    maintenanceMode: false,
    notifications: true,
    darkMode: false,
    autoBackup: false,
    twoFactorAuth: false,
    sessionTimeout: 30, // in minutes
    loggingLevel: "info",
    apiKey: "************", // Masked for security
  });

  const handleChange = (e: { target: { name: any; value: any; type: any; checked: any; }; }) => {
    const { name, value, type, checked } = e.target;
    setSettings({ ...settings, [name]: type === "checkbox" ? checked : value });
  };

  const regenerateApiKey = () => {
    const newApiKey = Math.random().toString(36).substring(2, 18).toUpperCase();
    setSettings({ ...settings, apiKey: newApiKey });
  };

  async function handleSubmit(e: { preventDefault: () => void; }) {
    e.preventDefault();
    try {
      await fetchWithAuth("/api/adminSettings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      alert("Settings updated successfully!");
    } catch (error) {
      console.error("Error updating settings:", error);
    }
  }

  return (
    <div className="flex flex-col p-6 md:p-10 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 text-center md:text-left">Admin Settings</h1>
      <div className="max-w-4xl p-6 bg-white shadow-lg rounded-lg mt-8">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {[
            { label: "Enable Maintenance Mode", name: "maintenanceMode" },
            { label: "Enable Notifications", name: "notifications" },
            { label: "Enable Dark Mode", name: "darkMode" },
            { label: "Enable Auto Backup", name: "autoBackup" },
            { label: "Enable Two-Factor Authentication", name: "twoFactorAuth" },
          ]?.map((setting) => (
            <div key={setting.name} className="flex items-center justify-between p-3 bg-gray-50 shadow rounded-lg">
              <label className="text-gray-700">{setting.label}</label>
              <input
                type="checkbox"
               // name={setting.name}
                //checked={settings[setting.name]}
                onChange={handleChange}
                className="w-5 h-5"
              />
            </div>
          ))}

          <div className="p-3 bg-gray-50 shadow rounded-lg">
            <label className="block text-gray-700">Session Timeout (minutes)</label>
            <input
              type="number"
              name="sessionTimeout"
              value={settings.sessionTimeout}
              onChange={handleChange}
              className="w-full p-2 border rounded mt-2"
            />
          </div>

          <div className="p-3 bg-gray-50 shadow rounded-lg">
            <label className="block text-gray-700">Logging Level</label>
            <select
              name="loggingLevel"
              value={settings.loggingLevel}
             // onChange={handleChange}
              className="w-full p-2 border rounded mt-2"
            >
              <option value="debug">Debug</option>
              <option value="info">Info</option>
              <option value="warn">Warn</option>
              <option value="error">Error</option>
            </select>
          </div>

       

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
