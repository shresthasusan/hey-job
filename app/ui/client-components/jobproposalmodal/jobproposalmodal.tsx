import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

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

interface JobProposalModalProps {
  proposal: Proposal;
  onClose: () => void;
  onHire: () => void;
  onReject: () => void;
}

const JobProposalModal: React.FC<JobProposalModalProps> = ({ proposal, onClose, onHire, onReject }) => {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 transition-opacity duration-300">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl transition-transform transform scale-100 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors duration-300"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>
        <h2 className="text-3xl font-bold text-yellow-500 mb-6">Proposal Details</h2>
        <div className="space-y-4">
          <p className="text-lg"><strong>Cover Letter:</strong> {proposal.coverLetter}</p>
          <p className="text-lg"><strong>Bid Amount:</strong> ${proposal.bidAmount}</p>
          {proposal.attachments && (
            <div className="text-lg">
              <strong>Attachments:</strong>
              <a href={proposal.attachments} target="_blank" rel="noopener noreferrer" className="text-blue-500 ml-2">
                View Attachment
              </a>
            </div>
          )}
          <p className="text-lg"><strong>User ID:</strong> {proposal.userId}</p>
          <p className="text-lg"><strong>Created Time:</strong> {new Date(proposal.createdAt).toLocaleString()}</p>
        </div>
        <div className="mt-6 flex justify-between space-x-4">
          <button
            onClick={onReject}
            className="px-6 py-3 bg-red-400 text-white rounded-full hover:bg-red-700 transition-colors duration-300"
          >
            Reject
          </button>
          <button
            onClick={onHire}
            className="px-6 py-3 bg-green-400 text-white rounded-full hover:bg-green-700 transition-colors duration-300"
          >
            Hire
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobProposalModal;