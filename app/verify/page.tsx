"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

const VerifyEmail = () => {
  const searchParams = useSearchParams();
  const [message, setMessage] = useState("Verifying...");

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get("token");

      if (!token) {
        setMessage("Invalid or missing token");
        return;
      }

      try {
        const res = await fetch(`/api/email-verification?token=${token}`);

        if (!res.ok) {
          const errorData = await res.json();
          setMessage(errorData.message || "Verification failed");
          return;
        }

        setMessage("Email verified successfully");
      } catch (error) {
        console.error("Error verifying email:", error);
        setMessage("An unexpected error occurred. Please try again.");
      }
    };

    verifyEmail();
  }, [searchParams]);

  return (
    <motion.div
      className="flex items-center justify-center min-h-screen bg-gray-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="bg-white p-8 rounded-lg shadow-lg text-center"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold mb-4">Email Verification</h1>
        <p className="text-gray-700">{message}</p>
      </motion.div>
    </motion.div>
  );
};

// ✅ Wrap in <Suspense> before exporting
const Verify = () => (
  <Suspense fallback={<div className="text-center p-4">Loading...</div>}>
    <VerifyEmail />
  </Suspense>
);

export default Verify;
