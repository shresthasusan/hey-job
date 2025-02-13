"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const Verify = () => {
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

  return <div>{message}</div>;
};

export default Verify;
