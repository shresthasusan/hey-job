import ProposalForm from "@/app/ui/proposal/proposal-form";
import Proposal from "@/models/proposal";
import React from "react";

const page = () => {
  return (
    <div className="flex max-w-screen-xl w-full py-14 mx-auto">
      <ProposalForm />
    </div>
  );
};

export default page;
