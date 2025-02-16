import React from "react";

interface JobDetailsProps {
  jobId: string;
}

const JobDetails = async ({ jobId }: JobDetailsProps) => {
  const response = await fetch(`/api/fetchJobs?jobId=${jobId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: {
      revalidate: 3600, // Revalidate the data every 1 hour
    },
  });
  const jobDetails = await response.json();

  return (
    <div className="border-2 border-gray-400 p-5 ">
      JobDetails
      <div className="flex">
        <div className="p-5">jobDetails</div>
      </div>
    </div>
  );
};

export default JobDetails;
