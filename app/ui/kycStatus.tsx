"use client";
import React, { useState } from "react";
import useFetch from "../hooks/useFetch";
import Link from "next/link";
import { useSession } from "next-auth/react";

export interface KYCStatusResponse {
  kycVerified: boolean;
}

const KYCStatus: React.FC = () => {
  const { data: session } = useSession();
  const [isVisible, setIsVisible] = useState(true);

  const { data, error } = useFetch<KYCStatusResponse>(
    `/verification-status/${session?.user.id}`
  );

  if (error) {
    console.error("Error fetching KYC status:", error);
    return null;
  }

  if (data?.kycVerified || !isVisible) {
    return null; // Do not show the notification bar if KYC is verified or if the notification is closed
  }

  return (
    <div className="fixed top-[75px] z-[5] left-0 right-0 bg-yellow-500 text-white p-2 px-10 flex justify-between items-center">
      <span>
        Your KYC is not verified. Please complete your KYC verification.{" "}
        <Link href={`/kyc-form/${session?.user.id}`} className="underline">
          {" "}
          Verify Now
        </Link>
      </span>
      <button
        className="text-white ml-4 text-2xl"
        onClick={() => setIsVisible(false)}
      >
        &times;
      </button>
    </div>
  );
};

export default KYCStatus;
