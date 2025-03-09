"use client";
import React, { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation"; // ✅ Use this instead of next/router
import { fetchWithAuth } from "../lib/fetchWIthAuth";

export interface KYCStatusResponse {
  kycVerified: boolean;
  emailVerified: boolean;
}

const KYCStatus: React.FC = () => {
  const { data: session, status } = useSession();

  const [isVisible, setIsVisible] = useState(true);
  const router = useRouter(); // ✅ Use useRouter from next/navigation
  const pathname = usePathname();
  const { data, error } = useFetch<KYCStatusResponse>(`/verification-status`); // fetch kycVerified
  const id = session?.user.id;

  useEffect(() => {
    if (status !== "authenticated") return;

    fetchWithAuth("/api/user?fields=roles") // ✅ Fetch only roles from API
      .then((res) => res.json())
      .then((data) => {
        if (data.roles && !data.roles.client && !data.roles.freelancer) {
          router.push(`/signup/profile-upload/${id}`);
        }
        if (pathname.startsWith("/user") && !data.roles.freelancer) {
          console.log("false", data.roles.freelancer);
          router.push(`/signup/freelancer`);
        }
        if (pathname.startsWith("/client") && !data.roles.client) {
          router.push(`/signup/client`);
        }
      })
      .catch((err) => console.error("Error fetching roles:", err));

    if (
      !data?.kycVerified &&
      pathname.startsWith("client/job-proposal") &&
      pathname.includes("offer")
    ) {
      router.push("/kyc-required");
    }
    if (
      !data?.kycVerified &&
      pathname.startsWith("user/offer") &&
      pathname.includes("offer")
    ) {
      router.push("/kyc-required");
    }
    if (
      (!data?.emailVerified && pathname.startsWith("/client/post-job")) ||
      pathname.startsWith("/user/proposal")
    ) {
      router.push("/email-required");
    }
  }, [status, id, router, pathname, data?.kycVerified, data?.emailVerified]);

  if (error) {
    console.error("Error fetching KYC status:", error);
    return null;
  }

  if (data?.kycVerified || !isVisible) {
    return null; // Do not show the notification bar if KYC is verified or closed
  }

  return (
    <div className="fixed top-[75px] z-[5] left-0 right-0 bg-yellow-500 text-white p-2 px-10 flex justify-between items-center">
      <span>
        Your KYC is not verified. Please complete your KYC verification.{" "}
        <Link href={`/kyc-form/${session?.user.id}`} className="underline">
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
