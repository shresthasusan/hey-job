"use client";

import { jobsData, recent } from "@/app/lib/data";
import { HeartIcon as Unliked, MapPinIcon } from "@heroicons/react/24/outline";
import { HeartIcon as Liked } from "@heroicons/react/24/solid";
import { useState, useEffect, use } from "react";
import styles from "./jobListingCss.module.css";
import SaveButton from "../../saveButton";

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
  jobId: string; // Added jobId field to match the provided data structure
}

// JobList component definition
const JobList = ({ bestMatches, mostRecent, savedJobs, query }: Props) => {
  // State variable to store fetched job data, initialized as an empty array
  const [data, setData] = useState<Job[]>([]);

  // useEffect hook to fetch job data when the component mounts
  useEffect(() => {
    // Create an AbortController to allow aborting the fetch request
    const controller = new AbortController();

    // Async function to fetch job data from the API
    const fetchData = async () => {
      try {
        // Build the query string based on the passed props
        const params = new URLSearchParams();
        if (bestMatches) params.append("bestMatches", "true");
        if (mostRecent) params.append("mostRecent", "true");
        if (savedJobs) params.append("savedJobs", "true");
        if (query) params.append("query", query);

        const response = await fetch(`/api/fetchJobs?${params.toString()}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          next: {
            revalidate: 3600, // Revalidate the data every 1 hour
          },
        });

        // Check if the response is not OK (status code is not in the range 200-299)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Parse the JSON response to get the jobs data
        const { jobs } = await response.json();

        // Update the state with the fetched jobs data
        setData(jobs);
      } catch (error) {
        // Log any errors that occur during the fetch
        console.error("Error fetching jobs:", error);
      }
    };

    // Call the fetchData function to fetch job data
    fetchData();

    // Cleanup function to abort the fetch request if the component unmounts
    return () => {
      controller.abort();
    };
  }, [query]); // Empty dependency array means this effect runs once when the component mounts

  return (
    <div className="flex boader flex-col mt-8  ">
      {data.map((job, index) => (
        <div
          key={index}
          className={`flex flex-col gap-1  p-5 border-t-2  border-gray-200 `}
        >
          <p className="text-xs text-gray-400"> Posted {job.time}</p>
          <div className="flex items-center justify-between ">
            <h1 className="text-2xl text-gray-500  font-medium">{job.title}</h1>
            {/* {job.saved ? (
              <Liked className="w-6 h-6 text-red-600 " />
            ) : (
              <Unliked className="w-6 h-6  " />
            )} */}
            <SaveButton jobId={job.jobId} saved={job.saved} />
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

          <div className="flex justify-start gap-5 flex-wrap items-center">
            {job.tags.map((tag, index) => (
              <div
                key={index}
                className="bg-slate-200 text-slate-500 p-3 flex flex-wrap justify-center items-center  rounded-2xl"
              >
                {tag}
              </div>
            ))}
          </div>
          <p className="text-sm mt-5 flex font-medium  text-gray-500">
            <MapPinIcon className="w-5 h-5 " /> {job.location}
          </p>
        </div>
      ))}
    </div>
  );
};

export default JobList;
