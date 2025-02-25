"use client";
import React, { useEffect, useState } from "react";
import { fetchWithAuth } from "@/app/lib/fetchWIthAuth";
import { ClockIcon, CurrencyDollarIcon, MapPinIcon, TagIcon, UserIcon } from "@heroicons/react/24/outline";
import { getTimeAgo } from "../../dashboard-components/job-list/jobList";

interface Proposal {
  id: string;
  jobId: string;
  userId: string;
  clientId: string;
  coverLetter: string;
  createdAt: string;
}

interface Job {
  id: string;
  title: string;
  description: string;
  proposalCount: number;
  fullName: string;
  location: string;
  createdAt: string;
  budget: number;
  tags: string[];
}

interface AllProposalsListProps {
  jobId: string;
}

const AllProposalsList: React.FC<AllProposalsListProps> = ({ jobId }) => {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchJobAndProposals = async () => {
      try {
        // Fetch job details
        const jobResponse = await fetchWithAuth(`/api/fetchJobs?jobId=${jobId}`);
        const jobData = await jobResponse.json();
        setJob(jobData);

        // Fetch proposals
        const proposalsResponse = await fetchWithAuth(`/api/jobproposal?jobId=${jobId}`);
        const proposalsData = await proposalsResponse.json();
        setProposals(proposalsData.proposals);
      } catch (error) {
        console.error("Error fetching job and proposals:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobAndProposals();
  }, [jobId]);

  return (
    <div className="container mx-auto p-4">
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <>
          {job && (
            <div className="mb-8">
              <div className="rounded-2xl p-10 w-full bg-white border">
                <h2 className="text-4xl font-bold mb-4">{job.title}</h2>
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
                <div className="flex justify-center gap-2 mt-4 mb-4">
                  {job.tags.map((tag, index) => (
                    <span key={index} className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full flex items-center">
                      <TagIcon className="w-4 h-4 mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {proposals.length === 0 ? (
            <div className="text-center">
              <p className="text-xl">No proposals found.</p>
            </div>
          ) : (
            <div className="flex overflow-x-auto space-x-4">
              {proposals.map((proposal) => (
                <div
                  key={proposal.id}
                  className="border-dotted border-2 border-gray-300 p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-300 bg-white min-w-[250px] flex-shrink-0"
                >
                  <p className="text-gray-700 mb-2">{proposal.coverLetter}</p>
                  <p className="text-gray-500 text-sm mb-1">{proposal.userId}</p>
                  <p className="text-gray-500 text-sm">{new Date(proposal.createdAt).toLocaleString()}</p>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AllProposalsList;