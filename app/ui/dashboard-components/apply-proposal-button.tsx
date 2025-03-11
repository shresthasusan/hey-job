import React, { useEffect, useState } from "react";
import Link from "next/link";
import { fetchWithAuth } from "@/app/lib/fetchWIthAuth";

interface Props {
  jobId?: string;
  userId?: string;
}

const ApplyProposalButton = ({ jobId, userId }: Props) => {
  const [loading, setLoading] = useState(true);
  const [actions, setActions] = useState<string[] | null>(null);

  useEffect(() => {
    // Fetch the actions data when the component mounts
    const fetchActions = async () => {
      try {
        const response = await fetchWithAuth(
          `/api/check-action?jobId=${jobId}&freelancerId=${userId}`
        );
        const data = await response.json();
        console.log("Fetched data:", data);

        // Set the actions state with the returned actions data
        setActions(data?.actions || []);
        setLoading(false);
      } catch (error) {
        console.error("Fetch error:", error);
        setLoading(false); // Stop loading in case of error
      }
    };

    fetchActions();
  }, [jobId, userId]);

  if (loading) return <p>Loading...</p>; // Show loading while fetching data

  return (
    <>
      {Array.isArray(actions) && actions.includes("proposal_submitted") ? (
        <div className="mt-10 text-primary-500">
          {" "}
          You&apos;ve already applied for this job
          <br />
          <Link className="underline" href={"/user/your-proposal"}>
            View Proposal
          </Link>
        </div>
      ) : (
        <div className="mt-10">
          {/* Apply Button */}
          <Link
            className="w-full bg-primary-600 text-white py-3 rounded-lg px-8  hover:bg-primary-700 transition"
            href={`/user/proposal/${jobId}`}
          >
            Apply for this Job
          </Link>
        </div>
      )}
    </>
  );
};

export default ApplyProposalButton;
