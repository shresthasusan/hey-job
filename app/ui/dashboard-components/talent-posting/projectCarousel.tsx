'use client';
import React, { useEffect, useState, useRef } from 'react';
import { ClockIcon, CurrencyDollarIcon, MapPinIcon, TagIcon, UserIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { getTimeAgo } from '../../dashboard-components/job-list/jobList';
import { useSession } from 'next-auth/react';

interface Job {
  id: string;
  title: string;
  description: string;
  fullName: string;
  location: string;
  createdAt: string;
  budget: number;
  tags: string[];
  proposalCount: number;
}

const ProjectCarousel: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { data: session } = useSession();
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (session?.user.id) {
      // Fetch jobs posted by the user
      const fetchJobs = async () => {
        try {
          const response = await fetch(`/api/fetchJobs?userId=${session?.user.id}`);
          const data = await response.json();
          console.log("Fetched jobs:", data.jobs); // Log the fetched jobs
          // Sort jobs by creation date in descending order
          const sortedJobs = data.jobs.sort((a: Job, b: Job) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          setJobs(sortedJobs);
        } catch (error) {
          console.error("Error fetching jobs:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchJobs();
    }
  }, [session?.user.id]);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      {jobs.length === 0 ? (
        <div className="text-center">
          <p className="text-xl">You haven&apos;t posted any job yet.</p>
        </div>
      ) : (
        <div className="relative">
          <button onClick={scrollLeft} className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-md hover:bg-gray-300 transition-colors duration-300">
            <ChevronLeftIcon className="w-6 h-6 text-gray-600" />
          </button>
          <div ref={carouselRef} className="flex overflow-x-auto space-x-4 p-6 scrollbar-hide">
            {jobs.map((job) => (
              <div key={job.id} className="min-w-[300px] border p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-300 bg-white">
                <h2 className="text-xl font-semibold mb-2 items-center">
                  {job.title}
                  {job.proposalCount > 0 && (
                    <span className="ml-2 text-xs bg-green-500 text-white px-2 py-1 rounded-full">
                      {job.proposalCount} proposals
                    </span>
                  )}
                </h2>
                <p className="text-gray-700 mb-2">{job.description}</p>
                <div className="flex items-center mb-2">
                  <UserIcon className="w-5 h-5 mr-2 text-gray-600" />
                  <p className="text-gray-600">{job.fullName}</p>
                </div>
                <div className="flex items-center mb-2">
                  <MapPinIcon className="w-5 h-5 mr-2 text-gray-600" />
                  <p className="text-gray-600">{job.location}</p>
                </div>
                <div className="flex items-center mb-2">
                  <ClockIcon className="w-5 h-5 mr-2 text-gray-600" />
                  <p className="text-gray-600">{getTimeAgo(job.createdAt)}</p>
                </div>
                <div className="flex items-center mb-2">
                  <CurrencyDollarIcon className="w-5 h-5 mr-2 text-gray-600" />
                  <p className="text-gray-600">Est. Budget: ${job.budget}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {job.tags.map((tag, index) => (
                    <span key={index} className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full flex items-center">
                      <TagIcon className="w-4 h-4 mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <button onClick={scrollRight} className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-md hover:bg-gray-300 transition-colors duration-300">
            <ChevronRightIcon className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProjectCarousel;