import React, { Suspense } from "react";
import ContractsList from "@/app/ui/client-components/all-contracts/contractsList";
import ContractsFilter from "@/app/ui/client-components/all-contracts/contractFilter";
// import contract from "@/models/contract";

const YourContractsPage: React.FC = () => {
  return (
    <div className="">
      <h1 className="text-4xl font-medium">Your Contracts</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <ContractsFilter />
        <ContractsList />
      </Suspense>
    </div>
  );
};

export default YourContractsPage;
