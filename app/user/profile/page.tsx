"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "@/app/lib/firebase";
import Image from "next/image";
import { Button } from "../../ui/button";
import { fetchWithAuth } from "@/app/lib/fetchWIthAuth";

const ProfilePage: React.FC = () => {
  const { data: session } = useSession();
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [dob, setDob] = useState("");
  const [country, setCountry] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipPostalCode, setZipPostalCode] = useState("");
  const [phone, setPhone] = useState("");
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || "");
    }
  }, [session]);

  // Handle File Upload
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];

    const storageRef = ref(storage, `profile_pictures/${session?.user.id}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    setUploading(true);

    uploadTask.on(
      "state_changed",
      null,
      (error) => {
        console.error("Upload error:", error);
        setUploading(false);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        setProfilePicture(downloadURL);
        setUploading(false);
      }
    );
  };

  // Handle Profile Update
  const handleUpdateProfile = async () => {
    try {
      const response = await fetchWithAuth("/api/profile-update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: session?.user.id,
          dob,
          country,
          streetAddress,
          city,
          state,
          zipPostalCode,
          phone,
          profilePicture,
        }),
      });

      if (response.ok) {
        alert("Profile updated successfully!");
      } else {
        alert("Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-gray-700">
        Edit Profile
      </h2>

      {/* Profile Picture */}
      <div className="flex flex-col items-center my-4">
        <Image
          src={profilePicture || "/images/image.png"}
          width={100}
          height={100}
          className="rounded-full border"
          alt="Profile Picture"
        />
        <input type="file" onChange={handleFileChange} className="mt-2" />
        {uploading && <p className="text-sm text-gray-500">Uploading...</p>}
      </div>

      {/* Name */}
      <div className="my-3">
        <label className="block text-gray-600 font-medium">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2 rounded-md"
        />
      </div>

      {/* Bio */}
      <div className="my-3">
        <label className="block text-gray-600 font-medium">Bio</label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="w-full border p-2 rounded-md"
        />
      </div>

      {/* Date of Birth */}
      <div className="my-3">
        <label className="block text-gray-600 font-medium">Date of Birth</label>
        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          className="w-full border p-2 rounded-md"
        />
      </div>

      {/* Country */}
      <div className="my-3">
        <label className="block text-gray-600 font-medium">Country</label>
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="w-full border p-2 rounded-md"
        />
      </div>

      {/* Street Address */}
      <div className="my-3">
        <label className="block text-gray-600 font-medium">Street Address</label>
        <input
          type="text"
          value={streetAddress}
          onChange={(e) => setStreetAddress(e.target.value)}
          className="w-full border p-2 rounded-md"
        />
      </div>

      {/* City */}
      <div className="my-3">
        <label className="block text-gray-600 font-medium">City</label>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full border p-2 rounded-md"
        />
      </div>

      {/* State */}
      <div className="my-3">
        <label className="block text-gray-600 font-medium">State</label>
        <input
          type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
          className="w-full border p-2 rounded-md"
        />
      </div>

      {/* ZIP/Postal Code */}
      <div className="my-3">
        <label className="block text-gray-600 font-medium">ZIP/Postal Code</label>
        <input
          type="text"
          value={zipPostalCode}
          onChange={(e) => setZipPostalCode(e.target.value)}
          className="w-full border p-2 rounded-md"
        />
      </div>

      {/* Phone */}
      <div className="my-3">
        <label className="block text-gray-600 font-medium">Phone</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border p-2 rounded-md"
        />
      </div>

      {/* Save Button */}
      <Button onClick={handleUpdateProfile} className="w-full mt-4">
        Save Changes
      </Button>
    </div>
  );
};

export default ProfilePage;