"use client";

import {
  ArrowLeftIcon,
  MapPinIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserIcon,
  TagIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import SaveButton from "../saveButton";
import { fetchWithAuth } from "@/app/lib/fetchWIthAuth";
import { useAuth } from "@/app/providers";
import ApplyProposalButton from "./apply-proposal-button";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface Job {
  _id: string;
  title: string;
  type: string;
  experience: string;
  budget: string;
  description: string;
  tags: string[];
  location: string;
  saved?: boolean;
  createdAt: string;
  fullName: string;
  fileUrls: string[];
  status: string;
  statusHistory?: { status: string; changedAt: string }[];
  proposalCount?: number;
}

const JobDetailsSlider: React.FC = () => {
  const { session } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");

  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch job data based on jobId from URL
  useEffect(() => {
    if (!jobId) {
      setJob(null);
      return;
    }

    const fetchJobData = async () => {
      setLoading(true);
      try {
        const response = await fetchWithAuth(
          `/api/fetchJobs?jobId=${jobId}&s=true`,
          {
            next: { revalidate: 60 },
          }
        );
        const jobData = await response.json();

        setJob(jobData);
      } catch (error) {
        console.error("Error fetching job data:", error);
        setJob(null);
      } finally {
        setLoading(false);
      }
    };

    fetchJobData();
  }, [jobId]);

  const onClose = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("jobId");
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const getTimeAgo = (dateString: string) => {
    const diffInSeconds = Math.floor(
      (new Date().getTime() - new Date(dateString).getTime()) / 1000
    );

    const units = [
      { label: "year", seconds: 31536000 },
      { label: "month", seconds: 2592000 },
      { label: "day", seconds: 86400 },
      { label: "hour", seconds: 3600 },
      { label: "minute", seconds: 60 },
    ];

    for (const unit of units) {
      const value = Math.floor(diffInSeconds / unit.seconds);
      if (value >= 1)
        return `${value} ${unit.label}${value > 1 ? "s" : ""} ago`;
    }

    return "just now";
  };

  // Animation variants for the slider
  const sliderVariants = {
    hidden: { x: "100%", opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    exit: {
      x: "100%",
      opacity: 0,
      transition: { duration: 0.3, ease: "easeIn" },
    },
  };

  // Animation variants for the overlay
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 0.3, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };

  // Pulsing animation for skeleton
  const pulseVariants = {
    pulse: {
      opacity: [0.4, 0.8, 0.4],
      transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
    },
  };

  if (!jobId) return null;

  return (
    <AnimatePresence>
      {jobId && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <motion.div
            className="absolute inset-0 bg-black"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          />
          <motion.div
            className="relative bg-white w-full max-w-4xl h-full p-6 shadow-xl overflow-y-auto rounded-l-lg"
            variants={sliderVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {loading || !job ? (
              <div className="space-y-6">
                {/* Header Skeleton */}
                <div className="flex items-center justify-between mb-6">
                  <motion.div
                    className="h-6 w-20 bg-gray-300 rounded"
                    variants={pulseVariants}
                    animate="pulse"
                  />
                  <motion.div
                    className="h-8 w-8 bg-gray-300 rounded-full"
                    variants={pulseVariants}
                    animate="pulse"
                  />
                </div>
                {/* Title Skeleton */}
                <motion.div
                  className="h-8 w-3/4 bg-gray-300 rounded"
                  variants={pulseVariants}
                  animate="pulse"
                />
                {/* Meta Info Skeleton */}
                <div className="flex space-x-4 pb-4 border-b">
                  <motion.div
                    className="h-5 w-1/4 bg-gray-300 rounded"
                    variants={pulseVariants}
                    animate="pulse"
                  />
                  <motion.div
                    className="h-5 w-1/4 bg-gray-300 rounded"
                    variants={pulseVariants}
                    animate="pulse"
                  />
                  <motion.div
                    className="h-5 w-1/4 bg-gray-300 rounded"
                    variants={pulseVariants}
                    animate="pulse"
                  />
                  <motion.div
                    className="h-5 w-1/4 bg-gray-300 rounded"
                    variants={pulseVariants}
                    animate="pulse"
                  />
                </div>
                {/* Description Skeleton */}
                <div className="mt-4 space-y-2 pb-4 border-b">
                  <motion.div
                    className="h-6 w-1/3 bg-gray-300 rounded"
                    variants={pulseVariants}
                    animate="pulse"
                  />
                  <motion.div
                    className="h-4 w-full bg-gray-300 rounded"
                    variants={pulseVariants}
                    animate="pulse"
                  />
                  <motion.div
                    className="h-4 w-5/6 bg-gray-300 rounded"
                    variants={pulseVariants}
                    animate="pulse"
                  />
                </div>
                {/* Tags Skeleton */}
                <div className="mt-4 pb-4 border-b">
                  <motion.div
                    className="h-6 w-1/3 bg-gray-300 rounded mb-2"
                    variants={pulseVariants}
                    animate="pulse"
                  />
                  <div className="flex space-x-2">
                    <motion.div
                      className="h-8 w-20 bg-gray-300 rounded-full"
                      variants={pulseVariants}
                      animate="pulse"
                    />
                    <motion.div
                      className="h-8 w-20 bg-gray-300 rounded-full"
                      variants={pulseVariants}
                      animate="pulse"
                    />
                  </div>
                </div>
                {/* Activity Skeleton */}
                <div className="mt-4 pb-4 border-b">
                  <motion.div
                    className="h-6 w-1/3 bg-gray-300 rounded mb-2"
                    variants={pulseVariants}
                    animate="pulse"
                  />
                  <motion.div
                    className="h-4 w-1/2 bg-gray-300 rounded"
                    variants={pulseVariants}
                    animate="pulse"
                  />
                </div>
                {/* Attachments Skeleton */}
                <div className="mt-4 pb-4 border-b">
                  <motion.div
                    className="h-6 w-1/3 bg-gray-300 rounded mb-2"
                    variants={pulseVariants}
                    animate="pulse"
                  />
                  <motion.div
                    className="h-4 w-1/2 bg-gray-300 rounded"
                    variants={pulseVariants}
                    animate="pulse"
                  />
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-6">
                  <button
                    className="text-gray-500 hover:text-gray-700 flex items-center"
                    onClick={onClose}
                  >
                    <ArrowLeftIcon className="w-6 h-6 mr-1" /> <span>Back</span>
                  </button>
                  <SaveButton
                    itemId={job._id}
                    saved={job.saved}
                    itemType="job"
                  />
                </div>
                <h2 className="text-2xl mb-2">{job.title}</h2>
                <div className="space-y-2 border-b text-sm flex pb-4 gap-5 justify-between">
                  <div className="flex items-center">
                    <UserIcon className="w-5 h-5 mr-2 text-gray-600" />
                    <p className="text-gray-600">{job.fullName}</p>
                  </div>
                  <div className="flex items-center">
                    <MapPinIcon className="w-5 h-5 mr-2 text-gray-600" />
                    <p className="text-gray-600">{job.location}</p>
                  </div>
                  <div className="flex items-center">
                    <ClockIcon className="w-5 h-5 mr-2 text-gray-600" />
                    <p className="text-gray-600">{getTimeAgo(job.createdAt)}</p>
                  </div>
                  <div className="flex items-center">
                    <CurrencyDollarIcon className="w-5 h-5 mr-2 text-gray-600" />
                    <p className="text-gray-600">Est. Budget: ${job.budget}</p>
                  </div>
                </div>
                <div className="mt-4 border-b pb-4">
                  <h3 className="text-lg mb-2">Job Description</h3>
                  <p className="text-gray-800">{job.description}</p>
                </div>
                <div className="mt-4 border-b pb-4">
                  <h3 className="text-lg mb-2">Required Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {job.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full flex items-center"
                      >
                        <TagIcon className="w-4 h-4 mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-4 border-b pb-4">
                  <h3 className="text-lg mb-2">Activity on this job</h3>
                  <div className="text-gray-700 space-y-1">
                    <p>
                      <strong>Proposals: </strong> {job.proposalCount ?? "N/A"}
                    </p>
                  </div>
                </div>
                <div className="mt-4 border-b pb-4">
                  <h3 className="text-lg mb-2">Attachments</h3>
                  {job.fileUrls && job.fileUrls.length > 0 ? (
                    <div className="flex items-center space-x-2">
                      <DocumentTextIcon className="w-5 h-5 text-gray-600" />
                      {job.fileUrls.map((url, index) => (
                        <a
                          key={index}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          View Attachment {index + 1}
                        </a>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-600">No attachments available</p>
                  )}
                </div>
                <ApplyProposalButton
                  jobId={job._id}
                  userId={session?.user.id}
                />
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default JobDetailsSlider;
