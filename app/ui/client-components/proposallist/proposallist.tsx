"use client";
import React, { useEffect, useState } from "react";
import { fetchWithAuth } from "@/app/lib/fetchWIthAuth";
import {
  ClockIcon,
  CurrencyDollarIcon,
  MapPinIcon,
  TagIcon,
  UserIcon,
  PaperClipIcon,
} from "@heroicons/react/24/outline";
import { getTimeAgo } from "../../dashboard-components/job-list/jobList";
import JobProposalModal from "@/app/ui/client-components/joblist-client/joblistpopupmodal";

interface Proposal {
  id: string;
  jobId: string;
  userId: string;
  clientId: string;
  attachments: string;
  coverLetter: string;
  bidAmount: number;
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

interface Freelancer {
  userId: string;
  fullName: string;
  profilePicture: string;
}

interface AllProposalsListProps {
  jobId: string;
}

const AllProposalsList: React.FC<AllProposalsListProps> = ({ jobId }) => {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(
    null
  );
  const [freelancers, setFreelancers] = useState<{ [key: string]: Freelancer }>(
    {}
  );

  useEffect(() => {
    const fetchJobAndProposals = async () => {
      try {
        // Fetch job details
        const jobResponse = await fetchWithAuth(
          `/api/fetchJobs?jobId=${jobId}`
        );
        const jobData = await jobResponse.json();
        setJob(jobData);

        // Fetch proposals
        const proposalsResponse = await fetchWithAuth(
          `/api/jobproposal?jobId=${jobId}`
        );
        const proposalsData = await proposalsResponse.json();
        setProposals(proposalsData.proposals);

        // Fetch freelancer data for each proposal
        const freelancerData = await Promise.all(
          proposalsData.proposals.map(async (proposal: Proposal) => {
            const response = await fetchWithAuth(
              `/api/freelancers?userId=${proposal.userId}`
            );
            const data = await response.json();
            return {
              userId: proposal.userId,
              fullName: data.freelancer.fullName,
              profilePicture: data.freelancer.profilePicture,
            };
          })
        );

        // Store freelancer data in state
        const freelancerMap: { [key: string]: Freelancer } = {};
        freelancerData.forEach((freelancer) => {
          freelancerMap[freelancer.userId] = freelancer;
        });
        setFreelancers(freelancerMap);
      } catch (error) {
        console.error("Error fetching job and proposals:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobAndProposals();
  }, [jobId]);

  const handleProposalClick = (proposal: Proposal) => {
    setSelectedProposal(proposal);
  };

  const handleCloseModal = () => {
    setSelectedProposal(null);
  };

  const handleHire = async () => {
    if (selectedProposal) {
      try {
        const response = await fetch("/api/hire-freelancer", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            proposalId: selectedProposal.id,
            freelancerId: selectedProposal.userId,
            jobId: selectedProposal.jobId,
          }),
        });

        if (response.ok) {
          console.log("Hired:", selectedProposal);
          setSelectedProposal(null);
        } else {
          console.error("Error hiring freelancer");
        }
      } catch (error) {
        console.error("Error hiring freelancer:", error);
      }
    }
  };

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
          )}

          {proposals.length === 0 ? (
            <div className="text-center">
              <p className="text-xl">No proposals found.</p>
            </div>
          ) : (
            <div>
              <p className="text-semibold text-2xl">
                The proposals for the job are below:
              </p>
              <p className="font-extralight text-gray-500 ">
                Click on a proposal to view more details.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {proposals.map((proposal) => (
                  <div
                    key={`${proposal.id}-${proposal.userId}`}
                    className="border-dotted border-2 border-gray-300 p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-300 bg-white cursor-pointer"
                    onClick={() => handleProposalClick(proposal)}
                  >
                    <p className="text-black-700 mb-2">
                      {proposal.coverLetter}
                    </p>
                    <p className="text-gray-700 mb-2"> ${proposal.bidAmount}</p>
                    {proposal.attachments && (
                      <div className="flex items-center justify-center text-blue-500 mb-2">
                        <PaperClipIcon className="w-5 h-5 mr-1" />
                        <a
                          href={proposal.attachments}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View Attachment
                        </a>
                      </div>
                    )}
                    <p className="text-black-500 font-semibold text-sm mb-1">
                      {freelancers[proposal.userId]?.fullName ||
                        proposal.userId}
                    </p>
                    <p className="text-gray-500 text-sm">
                      {new Date(proposal.createdAt).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedProposal && (
            <JobProposalModal
              proposal={selectedProposal}
              onClose={handleCloseModal}
            />
          )}
        </>
      )}
    </div>
  );
};

export default AllProposalsList;
