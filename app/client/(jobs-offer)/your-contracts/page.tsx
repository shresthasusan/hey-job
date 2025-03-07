import React from "react";
import ContractsList from "@/app/ui/client-components/all-contracts/contractsList";
import ContractsFilter from "@/app/ui/client-components/all-contracts/contractFilter";
// import contract from "@/models/contract";

interface SearchParams {
  contractStatus?: string;
  contractType?: string;
  search?: string;
}

interface Props {
  searchParams?: SearchParams;
}

const YourContractsPage: React.FC<Props> = ({ searchParams = {} }) => {
  const { contractStatus = "", contractType = "", search = "" } = searchParams;
  return (
    <div className="">
      <h1 className="text-4xl font-medium">Your Contracts</h1>
      <ContractsFilter />
      <ContractsList
        contractStatus={contractStatus}
        contractType={contractType}
        search={search}
      />
    </div>
  );
};

export default YourContractsPage;
