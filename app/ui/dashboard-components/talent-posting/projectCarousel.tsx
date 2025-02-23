<<<<<<< HEAD
'use client';
import React, { useEffect, useState } from 'react';
import { ClockIcon, CurrencyDollarIcon, MapPinIcon, TagIcon, UserIcon } from '@heroicons/react/24/outline';
import { getTimeAgo } from '../../dashboard-components/job-list/jobList';
=======
"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
>>>>>>> 65663cdd1be8f4064f12e298ae14b53423b5d069

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

const AllJobsPage: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user.id) {
      // Fetch jobs posted by the user
      const fetchJobs = async () => {
        try {
          const response = await fetch(
            `/api/fetchJobs?userId=${session?.user.id}`
          );
          const data = await response.json();
          console.log("Fetched jobs:", data.jobs); // Log the fetched jobs
          setJobs(data.jobs);
        } catch (error) {
          console.error("Error fetching jobs:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchJobs();
    }
  }, [session?.user.id]);

<<<<<<< HEAD
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
                            > <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                            <div  className="bg-white border rounded-2xl p-10  shadow-lg w-full max-w-5xl max-h-5xl overflow-y-auto">
                                <h2 className="text-4xl font-bold mb-2">{job?.title}</h2>
                
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
                
                                <div className="mt-4 border-b pb-4">
                                    <h3 className="text-xl p-4  font-semibold mb-2">Job Description</h3>
                                    <p className="text-gray-800">{job?.description}</p>
                                </div>
                
                                <div className="mt-4 border-b pb-4">
                                    <h3 className="text-xl p-4 font-semibold mb-2">Required Skills</h3>
                                    <div className="flex flex-wrap justify-center gap-2">
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
                            </div>
                            </div>
                            </li>
                        ))}
                    </ul>
                    
                </div>
            )}
=======
  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      {jobs.length === 0 ? (
        <div className="text-center">
          <p className="text-xl">You haven&apos;t posted any job yet.</p>
>>>>>>> 65663cdd1be8f4064f12e298ae14b53423b5d069
        </div>
      ) : (
        <div className="space-y-8">
          <p className="text-xl mb-4">Here are all the jobs you have posted:</p>
          <ul className="space-y-4">
            {jobs.map((job) => (
              <li
                key={`${job.id}-${job.title}`}
                className="border p-6 rounded-full hover:bg-gray-100 shadow hover:shadow-lg transition-shadow duration-300 relative cursor-pointer"
              >
                <h2 className="text-3xl font-semibold mb-2">{job.title}</h2>
                <p className="text-gray-700">{job.description}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AllJobsPage;
