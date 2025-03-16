"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { generateEsewaSignature } from "@/app/lib/generateEsewaSignature"; // Import your signature generator

interface PaymentDetails {
  transaction_code: string;
  status: string;
  total_amount: string;
  transaction_uuid: string;
  product_code: string;
  signature?: string; // Added signature field
  [key: string]: any;
}

const PaymentSuccessContent = () => {
  const searchParams = useSearchParams();
  const data = searchParams.get("data");
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(
    null
  );
  const [verifiedSignature, setVerifiedSignature] = useState<boolean | null>(
    null
  );

  useEffect(() => {
    if (data) {
      try {
        const decodedData = decodeURIComponent(data);
        const parsedData = JSON.parse(atob(decodedData)) as PaymentDetails;
        setPaymentDetails(parsedData);

        // Verify signature if present
        if (parsedData.signature) {
          const secretKey = process.env.NEXT_PUBLIC_ESEWA_SECRET_KEY; // Note: Avoid exposing this client-side
          if (secretKey) {
            const signatureString = `total_amount=${parsedData.total_amount},transaction_uuid=${parsedData.transaction_uuid},product_code=${parsedData.product_code}`;
            const localSignature = generateEsewaSignature(
              secretKey,
              signatureString
            );
            setVerifiedSignature(localSignature === parsedData.signature);
          }
        }
      } catch (error) {
        console.error("Error parsing payment data:", error);
      }
    }
  }, [data]);

  if (!paymentDetails) {
    return <div className="text-center p-10">Loading payment details...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center">
        <h2 className="text-2xl font-bold text-green-600">
          Payment Successful ✅
        </h2>
        <p className="mt-2 text-gray-600">Thank you for your payment!</p>

        <div className="mt-4 text-left">
          <p>
            <strong>Transaction Code:</strong> {paymentDetails.transaction_code}
          </p>
          <p>
            <strong>Status:</strong> {paymentDetails.status}
          </p>
          <p>
            <strong>Amount:</strong> NPR {paymentDetails.total_amount}
          </p>
          <p>
            <strong>Transaction ID:</strong> {paymentDetails.transaction_uuid}
          </p>
          <p>
            <strong>Product Code:</strong> {paymentDetails.product_code}
          </p>
          {paymentDetails.signature && (
            <>
              <p>
                <strong>Signature:</strong> {paymentDetails.signature}
              </p>
              {verifiedSignature !== null && (
                <p>
                  <strong>Signature Verification:</strong>{" "}
                  <span
                    className={
                      verifiedSignature ? "text-green-600" : "text-red-600"
                    }
                  >
                    {verifiedSignature ? "Verified" : "Not Verified"}
                  </span>
                </p>
              )}
            </>
          )}
        </div>

        <div className="mt-6 text-left w-full">
          <h3 className="text-lg font-semibold">Full Payment Data:</h3>
          <pre className="bg-gray-200 p-4 rounded-md text-sm overflow-x-auto">
            {JSON.stringify(paymentDetails, null, 2)}
          </pre>
        </div>

        <button
          className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
          onClick={() => (window.location.href = "/dashboard")} // Adjust redirect as needed
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

const PaymentSuccess = () => {
  return (
    <Suspense
      fallback={
        <div className="text-center p-10">Loading payment details...</div>
      }
    >
      <PaymentSuccessContent />
    </Suspense>
  );
};

export default PaymentSuccess;
