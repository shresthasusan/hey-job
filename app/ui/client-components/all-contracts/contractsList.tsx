"use client";

import { fetchWithAuth } from "@/app/lib/fetchWIthAuth";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

interface Contract {
  id: string;
  title: string;
  status: "pending" | "active" | "ended" | "paused";
  type: "fixed" | "hourly";
}

interface ContractsListProps {
  contractStatus?: string;
  contractType?: string;
  search?: string;
}

const ContractsList: React.FC<ContractsListProps> = ({
  contractStatus,
  contractType,
  search,
}: ContractsListProps) => {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchContracts = async () => {
      if (!session?.user?.id) return; // Ensure the session exists and the user has an ID.

      try {
        const response = await fetchWithAuth(
          `/api/fetch-contracts?clientId=${session.user.id}&status=${contractStatus}&paymentType=${contractType}`
        );

        if (!response.ok) throw new Error("Failed to fetch contracts");

        const { data }: { data: Contract[] } = await response.json();
        setContracts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchContracts();
  }, [contractStatus, contractType, session?.user?.id]);

  if (loading) return <p>Loading contracts...</p>;

  return (
    <div>
      {contracts.length > 0 ? (
        <ul>
          {contracts.map((contract) => (
            <li key={contract.id} className="border p-2 my-2 rounded">
              <h3>{contract.title}</h3>
              <p>Status: {contract.status}</p>
              <p>Type: {contract.type}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No contracts found.</p>
      )}
    </div>
  );
};

export default ContractsList;
