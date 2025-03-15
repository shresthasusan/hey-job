"use client";
import { fetchWithAuth } from "@/app/lib/fetchWIthAuth";
import { useAuth } from "@/app/providers";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function DisplayProfile() {
  const { session, status } = useAuth();
  const [userData, setUserData] = useState<any>(null);
  const [clientData, setClientData] = useState<any>(null);

  // Fetch user data
  useEffect(() => {
    if (session?.user?.id) {
      const fetchUserData = async () => {
        try {
          const res = await fetchWithAuth(
            `/api/user?userId=${session?.user.id}`
          );
          const data = await res.json();
          setUserData(data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
      fetchUserData();
    }
  }, [session]);

  // Fetch client data
  useEffect(() => {
    if (session?.user?.id) {
      const fetchClientData = async () => {
        try {
          const res = await fetchWithAuth(
            `/api/clientInfo?userId=${session?.user.id}`
          );
          const data = await res.json();
          setClientData(data.client); // Extract client object
        } catch (error) {
          console.error("Error fetching client data:", error);
        }
      };
      fetchClientData();
    }
  }, [session]);

  return (
    <div className="flex ml-16 mt-16 items-start bg-white-100 border min-h-screen">
      <div className="bg-white rounded-2xl p-8 w-full max-w-4xl flex flex-col">
        {/* Profile Header */}
        <div className="flex items-center mb-6">
          <div className="w-32 h-32 rounded-full overflow-hidden mr-6">
            <Image
              width={32}
              height={32}
              src={userData?.profilePicture || "/default-avatar.png"}
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-3xl font-semibold">
              {userData?.name} {userData?.lastName}
            </h2>
            <p className="text-lg text-gray-500">{userData?.email}</p>
          </div>
        </div>

        {/* Personal Information */}
        <div className="border-t pt-4 mb-6">
          <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
          <div className="grid grid-cols-4 gap-4 text-gray-700">
            <p>
              <span className="font-semibold">Phone:</span>{" "}
              {userData?.phone || "Not provided"}
            </p>
            <p>
              <span className="font-semibold">Country:</span>{" "}
              {userData?.country || "Not provided"}
            </p>
            <p>
              <span className="font-semibold">City:</span>{" "}
              {userData?.city || "Not provided"}
            </p>
            <p>
              <span className="font-semibold">Postal Code:</span>{" "}
              {userData?.zipPostalCode || "Not provided"}
            </p>
          </div>
        </div>

        {/* Account Information */}
        <div className="border-t pt-4">
          <h3 className="text-xl font-semibold mb-4">Account Information</h3>
          <div className="grid grid-cols-2 gap-4 text-gray-700">
            <p>
              <span className="font-semibold">Email:</span>{" "}
              {userData?.email || "Not provided"}
            </p>
            <p>
              <span className="font-semibold">KYC Verified:</span>{" "}
              {userData?.kycVerified ? "Yes" : "No"}
            </p>
            <p>
              <span className="font-semibold">Email Verified:</span>{" "}
              {userData?.emailVerified ? "Yes" : "No"}
            </p>
          </div>
        </div>

        {/* Client Information */}
        {clientData && (
          <div className="border-t pt-6 mt-6">
            <h2 className="text-2xl font-semibold mb-4">Client Information</h2>
            <div className="grid grid-cols-2 gap-4 text-gray-700">
              <p>
                <span className="font-semibold">Full Name:</span>{" "}
                {clientData?.fullName || "Not provided"}
              </p>
              <p>
                <span className="font-semibold">Company:</span>{" "}
                {clientData?.isCompany ? "Yes" : "No"}
              </p>
              <p>
                <span className="font-semibold">Industry:</span>{" "}
                {clientData?.industry?.join(", ") || "Not provided"}
              </p>
              <p>
                <span className="font-semibold">Company Size:</span>{" "}
                {clientData?.companySize || "Not provided"}
              </p>
              <p>
                <span className="font-semibold">Average Budget:</span> $
                {clientData?.averageBudget || "Not provided"}
              </p>
              <p>
                <span className="font-semibold">Preferred Skills:</span>{" "}
                {clientData?.preferredSkills?.join(", ") || "Not provided"}
              </p>
              <p>
                <span className="font-semibold">Location:</span>{" "}
                {clientData?.location || "Not provided"}
              </p>
              <p>
                <span className="font-semibold">Rating:</span>{" "}
                {clientData?.rating ?? "Not rated yet"}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
