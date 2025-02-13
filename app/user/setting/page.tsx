"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "../../ui/button";

const SettingsPage: React.FC = () => {
  const [name, setName] = useState("John Doe");
  const [bio, setBio] = useState("Web Developer | Freelancer");
  const [profilePicture, setProfilePicture] = useState("/default-avatar.png");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("paypal");

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl text-center mt-6 font-semibold text-gray-700">Settings</h2>

     

      

      
      {/* Notifications */}
      <div className="my-3">
        <h3 className="text-xl font-semibold">Notifications</h3>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={emailNotifications} />
          Email Notifications
        </label>
        <label className="flex items-center gap-2 mt-2">
          <input type="checkbox" checked={smsNotifications} />
          SMS Notifications
        </label>
      </div>

      {/* Payment Settings */}
      <div className="my-3">
        <h3 className="text-xl font-semibold">Payment Settings</h3>
        <select
          value={paymentMethod}
          className="w-full border p-2 rounded-md"
        >
          <option value="paypal">PayPal</option>
          <option value="stripe">Stripe</option>
          <option value="bank">Bank Transfer</option>
        </select>
      </div>

      {/* Save Button */}
      <Button className="w-full mt-4">Save Changes</Button>
    </div>
  );
};

export default SettingsPage;
