"use client";

import React, { useState } from "react";
import JobDetails from "./job-details";
import Terms from "./term";
import Duration from "./duration";
import { useSession } from "next-auth/react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import app from "@/app/lib/firebase";
import { Button } from "../button";
import { fetchWithAuth } from "@/app/lib/fetchWIthAuth";

interface OfferFormProps {
  jobId: string;
}

const OfferForm = ({ jobId }: OfferFormProps) => {
  const { data: session } = useSession();
  const [bidAmount, setBidAmount] = useState<string>("");
  const [coverLetter, setCoverLetter] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const storage = getStorage(app); // Firebase Storage reference

  // Upload files to Firebase Storage
  const uploadFiles = async () => {
    if (files.length === 0) return [];

    const uploadPromises = files.map(async (file) => {
      const fileRef = ref(
        storage,
        `proposals/${jobId}/${session?.user?.id}/${file.name}`
      );
      await uploadBytes(fileRef, file);
      return getDownloadURL(fileRef);
    });

    return Promise.all(uploadPromises);
  };

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setIsSubmitted(true);

    if (!bidAmount.trim() || !coverLetter.trim() || !duration) {
      console.error("Form validation failed!");
      setIsSubmitting(false);
      return;
    }

    try {
      const uploadedFiles = await uploadFiles();

      const proposalData = {
        jobId,
        bidAmount,
        coverLetter,
        duration,
        attachments: uploadedFiles,
      };

      const response = await fetchWithAuth(
        `/api/submit-proposal/${session?.user.id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(proposalData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit proposal");
      }

      console.log("Proposal submitted successfully");

      setFiles([]); // Clear selected files after submission
    } catch (error) {
      console.error("Error uploading files:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full flex gap-10 flex-col">
      <p className="text-left text-4xl font-medium">Submit a Proposal</p>
      <JobDetails jobId={jobId} />
      <form onSubmit={handleSubmit} className="flex gap-10 flex-col">
        <Terms
          bidAmount={bidAmount}
          setBidAmount={setBidAmount}
          isSubmitted={isSubmitted}
        />

        <Duration
          duration={duration}
          setDuration={setDuration}
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
    </div>
  );
};

export default OfferForm;
