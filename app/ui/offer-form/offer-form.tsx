"use client";

import React, { useState } from "react";
import JobDetails from "./job-details";
import Terms from "./term";
import Expiration from "./expiration";
import Deadline from "./deadline";
import { useSession } from "next-auth/react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import app from "@/app/lib/firebase";
import { Button } from "../button";
import { fetchWithAuth } from "@/app/lib/fetchWIthAuth";
import FreelancerDetail from "./freelancer-details";
import Alert from "../alert";

interface OfferFormProps {
  jobId: string;
  freelancerId: string;
}

const OfferForm = ({ jobId, freelancerId }: OfferFormProps) => {
  const [pricingType, setPricingType] = useState<string>(""); // Pricing Model
  const [bidAmount, setBidAmount] = useState<string>("");
  const [deadline, setDeadline] = useState<string>("");
  const [expiration, setExpiration] = useState("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [alert, setAlert] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setIsSubmitted(true);
    setAlert(null); // Reset alerts

    if (!bidAmount.trim() || !deadline) {
      setAlert({ type: "error", message: "Please fill all required fields!" });
      setIsSubmitting(false);
      return;
    }

    try {
      const proposalData = {
        jobId,
        freelancerId,
        bidAmount,
        deadline,
        pricingType,
        expiration,
      };

      const response = await fetchWithAuth(`/api/submit-offer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(proposalData),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      setAlert({
        type: "success",
        message: "Offer send successfully!",
      });
    } catch (error: any) {
      setAlert({
        type: "error",
        message: error.message || "Failed to submit proposal",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="w-full flex gap-10 flex-col">
      <p className="text-left text-4xl font-medium">Make an Offer</p>
      {/* Display alert */}
      <FreelancerDetail freelancerId={freelancerId} />
      <JobDetails jobId={jobId} />
      <form onSubmit={handleSubmit} className="flex gap-10 flex-col">
        <Terms
          bidAmount={bidAmount}
          setBidAmount={setBidAmount}
          isSubmitted={isSubmitted}
          pricingType={pricingType}
          setPricingType={setPricingType}
        />

        <Deadline
          deadline={deadline}
          setDeadline={setDeadline}
          isSubmitted={false}
        />

        <Expiration
          expiration={expiration}
          setExpiration={setExpiration}
          isSubmitted={isSubmitted}
        />

        <Button
          type="submit"
          className={` ${isSubmitting ? "bg-gray-400" : ""}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit Proposal"}
        </Button>
      </form>
      {alert && <Alert type={alert.type} message={alert.message} />}{" "}
    </div>
  );
};

export default OfferForm;
