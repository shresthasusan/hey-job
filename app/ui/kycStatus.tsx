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

  const { data } = useFetch<KYCStatusResponse>(
    `verfication-status/${session?.user.id}`
  );

  if (data?.kycVerified || !isVisible) {
    return null; // Do not show the notification bar if KYC is verified or if the notification is closed
  }

  return (
    <div className="fixed top-[75px] z-20 left-0 right-0 bg-yellow-500 text-white p-2 px-10 flex justify-between items-center">
      <span>
        Your KYC is not verified. Please complete your KYC verification.{" "}
        <Link href="/kyc-verification-form" className="underline">
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
