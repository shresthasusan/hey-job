"use client";
import React from "react";
import useFetch from "../hooks/useFetch";
import Link from "next/link";
import { useSession } from "next-auth/react";

export interface KYCStatusResponse {
  kycVerified: boolean;
}

const KYCStatus: React.FC = () => {
  const { data: session } = useSession();

  const { data, error } = useFetch<KYCStatusResponse>(
    `verification-status/${session?.user.id}`
  );

  if (error) {
    return <div>Error fetching KYC status</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  if (data.kycVerified) {
    return null; // Do not show the notification bar if KYC is verified
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-yellow-500 text-white p-4 flex justify-between items-center">
      <span>
        Your KYC is not verified. Please complete your KYC verification.
      </span>
      <Link href="/kyc-verification-form">
        <a className="bg-white text-yellow-500 px-4 py-2 rounded">Verify Now</a>
      </Link>
    </div>
  );
};

export default KYCStatus;
