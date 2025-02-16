import React from "react";
import JobDetails from "./job-details";
import Terms from "./term";
import CoverLetter from "./cover-letter";

interface ProposalFormProps {
  jobId: string;
}

const ProposalForm = ({ jobId }: ProposalFormProps) => {
  return (
    <div className="w-full flex gap-10 flex-col">
      <p className="text-left text-4xl font-medium">Submit a Proposal</p>
      <JobDetails jobId={jobId} />
      <Terms />
      <CoverLetter />
    </div>
  );
};

export default ProposalForm;
