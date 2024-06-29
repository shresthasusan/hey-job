"use client";

import { jobsData, recent } from "@/app/lib/data";
import { HeartIcon as Unliked, MapPinIcon } from "@heroicons/react/24/outline";
import { HeartIcon as Liked } from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";
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
}

interface Job {
  title: string;
  time: string;
  type: string;
  experience: string;
  budget: number; // Changed from string to number to match the provided data structure
  description: string;
  tags: string[];
  location: string;
  saved: boolean;
}

// Assuming jobsData, recent, and a way to filter saved jobs are available in the scope
// For saved jobs, assuming there's a need to filter jobsData or recent based on the saved property
const JobList = ({ bestMatches, mostRecent, savedJobs }: Props) => {
  const [data, setData] = useState<Job[]>([]); // Corrected the type to Job[] and initialized as an empty array

  useEffect(() => {
    let filteredData: Job[] = []; // Temporary array to hold filtered data
    if (bestMatches) {
      // Assuming bestMatches logic is to show all jobs from jobsData for this example
      filteredData = jobsData;
    } else if (mostRecent) {
      filteredData = recent;
    } else if (savedJobs) {
      // Assuming we filter jobsData for saved jobs, similar logic can be applied to 'recent' if needed
      filteredData = jobsData.filter((job) => job.saved);
    }
    setData(filteredData); // Update the state with the filtered data
  }, [bestMatches, mostRecent, savedJobs]);

  // Render logic or other operations can go here

  return (
    <div className="flex boader flex-col mt-8  ">
      {data.map((job, index) => (
        <div
          key={index}
          className="flex flex-col gap-1  p-5 border-t-2  border-gray-200 "
        >
          <p className="text-xs text-gray-400"> Posted {job.time}</p>
          <div className="flex items-center justify-between ">
            <h1 className="text-2xl text-gray-500 font-medium  ">
              {job.title}
            </h1>
            {job.saved ? (
              <Liked className="w-6 h-6 text-red-600 " />
            ) : (
              <Unliked className="w-6 h-6  " />
            )}
          </div>
          <p className="text-xs mt-2 text-gray-400">
            {job.type} - {job.experience} - Est. Budget: {job.budget}
          </p>
          <p className="text-black my-5 ">
            {truncateString(job.description, 400)}
            {job.description.length > 400 ? (
              <button className="text-primary-700 hover:text-primary-500">
                Read More
              </button>
            ) : null}
          </p>

          <div className="flex justify-start gap-5 items-center">
            {job.tags.map((tag, index) => (
              <div
                key={index}
                className="bg-slate-200 p-3 flex justify-center items-center  rounded-2xl"
              >
                {tag}
              </div>
            ))}
          </div>
          <p className="text-sm mt-5 flex font-semibold  text-gray-500">
            <MapPinIcon className="w-5 h-5 " /> {job.location}
          </p>
        </div>
      ))}
    </div>
  );
};

export default JobList;
