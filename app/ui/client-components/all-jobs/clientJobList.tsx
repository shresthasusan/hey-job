"use client";
import React, { useEffect, useState } from "react";
import JobDetailsModal from "../jobdetailsmodal/jobDetailCard";

interface Job {
  id: string;
  title: string;
  description: string;
  fullName: string;
  location: string;
  createdAt: string;
  budget: number;
  tags: string[];
}

interface AllJobsListProps {
  userId: string;
}

const AllJobsList: React.FC<AllJobsListProps> = (userId) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  useEffect(() => {
    if (userId) {
      // Fetch jobs posted by the user
      const fetchJobs = async () => {
        try {
          const response = await fetch(`/api/fetchJobs?userId=${userId}`);
          const data = await response.json();
          setJobs(data.jobs);
        } catch (error) {
          console.error("Error fetching jobs:", error);
        }
      };

      fetchJobs();
    }
  }, [userId]);

  const handleJobClick = (job: Job) => {
    setSelectedJob(job);
  };

  const handleCloseModal = () => {
    setSelectedJob(null);
  };

  return (
    <div className="container mx-auto p-4">
      {jobs.length === 0 ? (
        <div className="text-center">
          <p className="text-xl">You haven&apos;t posted any job yet.</p>
        </div>
      ) : (
        <div className="space-y-8">
          <p className="text-xl mb-4">Here are all the jobs you have posted:</p>
          <ul className="space-y-4">
            {jobs.map((job) => (
              <li
                key={`${job.id}-${job.title}`}
                className="border p-6 rounded-full hover:bg-gray-100 shadow hover:shadow-lg transition-shadow duration-300 relative cursor-pointer"
                onClick={() => handleJobClick(job)}
              >
                <h2 className="text-3xl font-semibold mb-2">{job.title}</h2>
                <p className="text-gray-700">{job.description}</p>
                <span className="absolute mr-4 bottom-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full">
                  proposal
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {selectedJob && (
        <JobDetailsModal job={selectedJob} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default AllJobsList;
