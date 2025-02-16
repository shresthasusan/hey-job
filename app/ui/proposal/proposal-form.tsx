import React from "react";

interface ProposalFormProps {
  jobId: string;
}

const ProposalForm = ({ jobId }: ProposalFormProps) => {
  return (
    <div>
      <p className="text-left text-4xl font-medium">Submit a Proposal</p>
    </div>
  );
};

export default ProposalForm;
