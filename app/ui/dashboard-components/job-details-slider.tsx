"use client";

import { Appcontext } from "@/app/context/appContext";
import {
  ArrowLeftIcon,
  MapPinIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserIcon,
  TagIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";
import { useContext, useEffect, useState } from "react";
import SaveButton from "../saveButton";
import { fetchWithAuth } from "@/app/lib/fetchWIthAuth";
import { useAuth } from "@/app/providers";

import ApplyProposalButton from "./apply-proposal-button";

const JobDetailsSlider: React.FC = () => {
  const { session, status } = useAuth();
  const {
    jobData: job,
    jobDetailsVisible,
    setJobDetailsVisible,
  } = useContext(Appcontext);

  const [jobStats, setJobStats] = useState({
    proposals: "Loading...",
    interviewing: "Loading...",
  });

  //fetch proposal when the panel opens

  // Fetch job stats when the panel opens
  useEffect(() => {
    if (jobDetailsVisible && job?.jobId) {
      fetchWithAuth(`/api/job-stats/${job.jobId}`)
        .then((res) => res.json())
        .then((data) => {
          setJobStats({
            proposals: data.proposals || "N/A",
            interviewing: data.interviewing || "N/A",
          });
        })
        .catch(() =>
          setJobStats({ proposals: "Error", interviewing: "Error" })
        );
    }
  }, [jobDetailsVisible, job?.jobId]);

  const onClose = () => {
    setJobDetailsVisible(false);
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

  return (
    <div
      className={`fixed inset-0 z-50 flex justify-end transition-opacity duration-100 ${
        jobDetailsVisible ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      {/* Dark overlay */}
      <div
        className={`absolute inset-0 bg-black bg-opacity-30 transition-opacity duration-1000 ${
          jobDetailsVisible ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      ></div>

      {/* Slide-in panel */}
      <div
        className={`relative bg-white w-full max-w-4xl h-full p-6 shadow-xl transform transition-transform duration-1000 overflow-y-auto ${
          jobDetailsVisible ? "translate-x-0" : "translate-x-full"
        } rounded-l-lg`}
      >
        {/* Top Navigation */}
        <div className="flex items-center justify-between mb-6">
          <button
            className="text-gray-500 hover:text-gray-700 flex items-center"
            onClick={onClose}
          >
            <ArrowLeftIcon className="w-6 h-6 mr-1" /> <span>Back</span>
          </button>
          <SaveButton itemId={job?.jobId} saved={job?.saved} itemType={"job"} />
        </div>

        {/* Job Title */}
        <h2 className="text-2xl  mb-2">{job?.title}</h2>

        {/* Job Meta Info */}
        <div className="space-y-2 border-b text-sm flex pb-4 gap-5 justify-between">
          <div className="flex items-center">
            <UserIcon className="w-5 h-5 mr-2 text-gray-600" />
            <p className="text-gray-600">{job?.fullName}</p>
          </div>
          <div className="flex items-center">
            <MapPinIcon className="w-5 h-5 mr-2 text-gray-600" />
            <p className="text-gray-600">{job?.location}</p>
          </div>
          <div className="flex items-center">
            <ClockIcon className="w-5 h-5 mr-2 text-gray-600" />
            <p className="text-gray-600">
              {getTimeAgo(job?.createdAt || new Date().toISOString())}
            </p>
          </div>
          <div className="flex items-center">
            <CurrencyDollarIcon className="w-5 h-5 mr-2 text-gray-600" />
            <p className="text-gray-600">Est. Budget: ${job?.budget}</p>
          </div>
        </div>

        {/* Job Description */}
        <div className="mt-4 border-b pb-4">
          <h3 className="text-lg  mb-2">Job Description</h3>
          <p className="text-gray-800">{job?.description}</p>
        </div>

        {/* Skills & Tags */}
        <div className="mt-4 border-b pb-4">
          <h3 className="text-lg  mb-2">Required Skills</h3>
          <div className="flex flex-wrap gap-2">
            {job?.tags.map((tag, index) => (
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

        {/* Activity on This Job */}
        <div className="mt-4 border-b pb-4">
          <h3 className="text-lg  mb-2">Activity on this job</h3>
          <div className="text-gray-700 space-y-1">
            <p>
              <strong>Proposals: </strong> {jobStats.proposals}
            </p>
            <p></p>
          </div>
        </div>

        {/* File Attachments */}
        <div className="mt-4 border-b pb-4">
          <h3 className="text-lg  mb-2">Attachments</h3>
          {job?.fileUrls && job.fileUrls.length > 0 ? (
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

        <ApplyProposalButton jobId={job?.jobId} userId={session?.user.id} />
      </div>
    </div>
  );
};

export default JobDetailsSlider;
