"use client";
import React, { useEffect, useState } from "react";

interface Proposal {
  id: string;
  jobId: string;
  userId: string;
  coverLetter: string;
  bid: number;
}

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

interface AllProposalsListProps {
  userId: string;
}

const AllProposalsList: React.FC<AllProposalsListProps> = ({ userId }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [proposals, setProposals] = useState<Proposal[]>([]);

  // Fetch jobs posted by the user
  useEffect(() => {
    if (userId) {
      const fetchJobs = async () => {
        try {
          const response = await fetch(`/api/fetchJobs?userId=${userId}`);
          const data = await response.json();
          setJobs(data.jobs);

          // Automatically set the first job's ID to fetch proposals
          if (data.jobs.length > 0) {
            setSelectedJobId(data.jobs[4].id);
          }
        } catch (error) {
          console.error("Error fetching jobs:", error);
        }
      };

      fetchJobs();
    }
  }, [userId]);

  // Fetch proposals when a job is selected
  useEffect(() => {
    if (selectedJobId) {
      const fetchProposals = async () => {
        try {
          const response = await fetch(`/api/jobproposal?jobId=${selectedJobId}`);
          const data = await response.json();
          setProposals(data.proposals);
        } catch (error) {
          console.error("Error fetching proposals:", error);
        }
      };

      fetchProposals();
    }
  }, [selectedJobId]);

  return (
    
      <div className="space-y-8">
        <p className="text-xl mb-4">Proposals for the selected job:</p>
        <ul className="space-y-4">
          {proposals.length > 0 ? (
            proposals.map((proposal) => (
              <li
                key={`${proposal.id}-${proposal.jobId}`}
                className="border border-gray-200 p-4 rounded-lg"
              >
                <h3 className="text-xl font-bold">{proposal.coverLetter}</h3>
                <p className="text-gray-500">Bid: {proposal.bid}</p>
              </li>
            ))
          ) : (
            <p className="text-gray-500">No proposals found.</p>
          )}
        </ul>
      </div>
    
  );
};

export default AllProposalsList;
