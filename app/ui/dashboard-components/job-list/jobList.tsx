"use client";

import { MapPinIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import SaveButton from "../../saveButton";
import PostingSkeleton from "../skeletons/postingSkeleton";
import { fetchWithAuth } from "@/app/lib/fetchWIthAuth";
import { useRouter } from "next/navigation";

const truncateString = (str: string, num: number) => {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + "... ";
};

interface Props {
  bestMatches?: boolean;
  mostRecent?: boolean;
  savedJobs?: boolean;
  query?: string;
}

export interface Job {
  title: string;
  time: string;
  type: string;
  experience: string;
  budget: number;
  description: string;
  tags: string[];
  location: string;
  saved: boolean;
  jobId: string;
  createdAt: string;
  fullName: string;
  fileUrls: string[];
  status: string;
}

export const getTimeAgo = (dateString: string) => {
  const units = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
  ];

  const diffInSeconds = Math.floor(
    (new Date().getTime() - new Date(dateString).getTime()) / 1000
  );
  if (diffInSeconds < 60) return "just now";

  for (const unit of units) {
    const value = Math.floor(diffInSeconds / unit.seconds);
    if (value >= 1) return `${value} ${unit.label}${value > 1 ? "s" : ""} ago`;
  }

  return "just now";
};

const JobList = ({ bestMatches, mostRecent, savedJobs, query }: Props) => {
  const [data, setData] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (bestMatches) params.append("bestMatches", "true");
        if (mostRecent) params.append("mostRecent", "true");
        if (savedJobs) params.append("savedJobs", "true");
        if (query) {
          const queryParams = new URLSearchParams(query);
          queryParams.forEach((value, key) => {
            params.append(key, value);
          });
        }

        const response = await fetchWithAuth(
          `/api/fetchJobs?${params.toString()}`,
          {
            method: "GET",
            next: { revalidate: 3600 },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const { jobs } = await response.json();
        setData(jobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [query, bestMatches, mostRecent, savedJobs]);

  const loadJobDetails = (jobId: string) => {
    const params = new URLSearchParams(window.location.search);
    params.set("jobId", jobId);
    router.push(`?${params.toString()}`, { scroll: false });
    console.log("Navigated to job details with jobId:", jobId);
  };

  return (
    <div className="flex flex-col mt-8 w-full">
      {loading ? (
        <PostingSkeleton />
      ) : data.length === 0 ? (
        <p className="text-center text-gray-500 mt-5">
          No jobs found. Try adjusting your search criteria.
        </p>
      ) : (
        data.map((job, index) => (
          <div key={index} className="relative">
            <div
              className="flex flex-col gap-1 p-5 border-t-2 border-gray-200 group"
              onClick={() => loadJobDetails(job.jobId)}
            >
              <p className="text-xs text-gray-400">
                Posted {getTimeAgo(job.createdAt)}
              </p>
              <div className="flex items-center justify-between">
                <h1 className="text-2xl text-gray-500 font-medium group-hover:text-primary-500 transition-all duration-250">
                  {job.title}
                </h1>
              </div>
              <p className="text-xs mt-2 text-gray-400">
                {job.type} - {job.experience} - Est. Budget: {job.budget}
              </p>
              <p className="text-black my-5">
                {truncateString(job.description, 400)}
                {job.description.length > 400 ? (
                  <button className="text-primary-700 hover:text-primary-500">
                    Read More
                  </button>
                ) : null}
              </p>
              <div className="flex justify-start gap-5 flex-wrap items-center">
                {job.tags.map((tag, index) => (
                  <div
                    key={index}
                    className="bg-slate-200 text-slate-500 p-3 flex flex-wrap justify-center items-center rounded-2xl"
                  >
                    {tag}
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center mt-5">
                <p className="text-sm mt-5 flex font-medium text-gray-500">
                  <MapPinIcon className="w-5 h-5" /> {job.location}
                </p>
                {job.status !== "active" && (
                  <p className="text-red-500 text-sm mt-2">
                    This job is no longer active
                  </p>
                )}
              </div>
            </div>
            <SaveButton itemId={job.jobId} saved={job.saved} itemType="job" />
          </div>
        ))
      )}
    </div>
  );
};

export default JobList;
