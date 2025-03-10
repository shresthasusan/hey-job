import useFetch from "@/app/hooks/useFetch";
import { Button } from "@/app/ui/button";
import React from "react";

interface Props {
  jobId: string;
  freelancerId?: string;
}

const AcceptButton = ({ jobId, freelancerId }: Props) => {
  const { data: actions = [], loading } = useFetch<string[]>(
    `/check-action?jobId=${jobId}&freelancerId=${freelancerId}`
  );

  if (loading) return <p>Loading...</p>;

  return (
    <div className="py-2 space-y-3 mb-4">
      {Array.isArray(actions) && actions.includes("proposal_submitted") ? (
        <span className="">You&apos;ve taken action for this offer</span>
      ) : (
        <>
          <Button className="w-full text-white font-medium py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2">
            Accept Offer
          </Button>

          <Button
            outline={true}
            danger={true}
            className="w-full font-medium py-2 px-4 rounded-md border hover:bg-zinc-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
          >
            Decline Offer
          </Button>
        </>
      )}
    </div>
  );
};

export default AcceptButton;
