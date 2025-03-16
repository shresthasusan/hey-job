"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";
import { fetchWithAuth } from "@/app/lib/fetchWIthAuth";

const PaymentConfirmContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const data = searchParams.get("data");

    if (!data) {
      setError("Missing payment data");
      return;
    }

    const confirmPayment = async () => {
      try {
        const response = await fetchWithAuth(
          `/api/esewa-payment/callback?data=${data}`,
          {
            method: "GET",
            redirect: "manual", // Handle redirect manually
          }
        );

        if (response.status === 302) {
          const redirectUrl = response.headers.get("location");
          if (redirectUrl) {
            router.push(redirectUrl); // Follow redirect to /success or /failure
          } else {
            setError("Redirect URL missing");
          }
        } else {
          const result = await response.json();
          setError(result.error || "Payment confirmation failed");
        }
      } catch (err) {
        console.error("Payment confirmation error:", err);
        setError("Error confirming payment");
      }
    };

    confirmPayment();
  }, [searchParams, router]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center">
          <h2 className="text-2xl font-bold text-red-600">Error</h2>
          <p className="mt-2 text-gray-600">{error}</p>
          <button
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            onClick={() => router.push("/payment")}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center">
        <h2 className="text-2xl font-bold">Processing Payment...</h2>
        <p className="mt-2 text-gray-600">
          Please wait while we confirm your payment.
        </p>
      </div>
    </div>
  );
};

const PaymentConfirm = () => {
  return (
    <Suspense fallback={<div className="text-center p-10">Loading...</div>}>
      <PaymentConfirmContent />
    </Suspense>
  );
};

export default PaymentConfirm;
