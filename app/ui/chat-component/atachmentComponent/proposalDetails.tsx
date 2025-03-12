import { Appcontext } from "@/app/context/appContext";
import Link from "next/link";
import { useContext } from "react";

const ProposalDetailsComponent = ({ data }: { data: any }) => (
  <div className="mt-3 rounded-lg border border-yellow-300 overflow-hidden shadow-sm">
    <div className="bg-yellow-100 p-4 border-b border-yellow-300">
      <h3 className="text-lg font-bold text-yellow-800">{data.jobId.title}</h3>
      <div className="flex flex-wrap gap-2 mt-2">
        <span className="px-2 py-1 bg-yellow-200 rounded-full text-sm font-medium text-yellow-800">
          Budget: {data.jobId.budget}
        </span>
        <span className="px-2 py-1 bg-yellow-200 rounded-full text-sm font-medium text-yellow-800">
          Experience: {data.jobId.experience}
        </span>
      </div>
    </div>
    <div className="p-4 bg-white border-b border-yellow-200">
      <p className="text-sm text-gray-700 line-clamp-3">
        {data.jobId.description}
      </p>
      <button className="mt-1 text-xs text-blue-600 hover:text-blue-800 font-medium">
        Read more
      </button>
    </div>
    <div className="p-4 bg-gray-50">
      <h4 className="font-semibold text-gray-700">Proposal Details</h4>
      <div className="flex items-center justify-between mb-2">
        <span className="text-gray-600 text-sm">Your Bid:</span>
        <span className="font-bold text-green-600">${data.bidAmount}</span>
      </div>
      <div className="mt-2">
        <p className="text-xs text-gray-500 font-medium mb-1">Cover Letter:</p>
        <p className="text-sm text-gray-700 bg-white p-2 rounded border border-gray-200 max-h-20 overflow-y-auto">
          {data.coverLetter}
        </p>
      </div>
      <div className="mt-2">
        <Link
          className="text-xs text-primary-500 underline font-medium mx-auto mb-1"
          href={
            userData?.id === msg.sId
              ? `/client/job-proposal/${data.jobId._id}`
              : `/user/your-proposals`
          }
        >
          View proposal
        </Link>
      </div>
    </div>
  </div>
);
