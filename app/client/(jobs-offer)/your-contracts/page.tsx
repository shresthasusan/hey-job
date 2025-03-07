import React from "react";
import ContractsList from "@/app/ui/client-components/all-contracts/contractsList";
import ContractsFilter from "@/app/ui/client-components/all-contracts/contractFilter";
// import contract from "@/models/contract";

const YourContractsPage: React.FC = () => {
  return (
    <div className="">
      <h1 className="text-4xl font-medium">Your Contracts</h1>
      <ContractsFilter />
      <ContractsList />
    </div>
  );
};

export default YourContractsPage;
