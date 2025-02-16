"use client";

import useFetch from "@/app/hooks/useFetch";
import React, { useEffect } from "react";
import { getTimeAgo } from "../dashboard-components/job-list/jobList";
import { MapPinIcon, TrophyIcon } from "@heroicons/react/24/outline";
import { CurrencyRupeeIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
interface JobDetailsProps {
  jobId: string;
}

type Data = {
  job: {
    _id: string;
    userId: string;
    fullName: string;
    location: string;
    tags: string[];
    experience: string;
    budget: string;
    description: string;
    title: string;
    createdAt: string;
    fileUrls: string[] | [];
  };
};

export function formatPostedDate(createdAt: string) {
  const createdDate = new Date(createdAt);
  const now = new Date();
  const diffInHours = Math.floor(
    (now.getTime() - createdDate.getTime()) / (1000 * 60 * 60)
  );

  if (diffInHours < 24) {
    return getTimeAgo(createdAt);
  }

  return createdDate.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

const JobDetails = ({ jobId }: JobDetailsProps) => {
  // useEffect(()=>{  const response = await fetch(`/api/fetchJobs?jobId=${jobId}`, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     next: {
  //       revalidate: 3600, // Revalidate the data every 1 hour
  //     },
  //   });}
  // )
  const { data } = useFetch<Data>(`/fetchJobs?jobId=${jobId}`);
  if (!data) {
    return;
  }

  return (
    <div className="border-2 border-gray-300 rounded-xl p-5 ">
      <p className="font-semibold text-xl">Job Details</p>
      <div className="flex justify-between mt-2">
        <div className="py-5 space-y-8 border-r-2 border-gray-300 pr-5 flex-1">
          <p className="text-xl">{data?.job.title}</p>
          <p className="mt-3">
            {data?.job.tags.map((tag) => (
              <span key={tag} className="bg-gray-200 p-2 rounded-2xl  text-sm ">
                {tag}
              </span>
            ))}
            <span className=" p-1 mx-1 text-sm text-gray-500">
              Posted {formatPostedDate(data?.job.createdAt || "")}
            </span>
          </p>
          <p className="text-gray-500 text-sm">{data?.job.description}</p>
          <p className="font-medium text-xl mt-18">
            Attachments
            <div className="flex gap-5 mt-2">
              {data.job.fileUrls?.length > 0 &&
                data?.job.fileUrls.map((url, index) => (
                  <Link
                    key={index}
                    className="text-primary-500 text-sm"
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Attachment {index + 1}
                  </Link>
                ))}
            </div>
          </p>
        </div>
        <div className="py-5 m-10 pr-14 text-sm">
          <div className="flex flex-col gap-5">
            <div className="flex gap-2 justify-start items-center">
              <TrophyIcon className="w-4 h-4 text-primary-500" />
              <p className="text-black">{data?.job.experience}</p>
            </div>
            <div className="flex gap-2 justify-start items-center">
              <CurrencyRupeeIcon className="w-4 h-4 text-primary-500" />
              <p className="text-black">{data?.job.budget}</p>
            </div>
            <div className="flex gap-2 justify-start items-center">
              <MapPinIcon className="w-4 h-4 text-primary-500" />
              <p className="text-black">{data?.job.location}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
