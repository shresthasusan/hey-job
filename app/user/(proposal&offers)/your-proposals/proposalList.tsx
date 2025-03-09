"use client";
import useFetch from "@/app/hooks/useFetch";
import { fetchWithAuth } from "@/app/lib/fetchWIthAuth";
import { Button } from "@/app/ui/button";
import Card from "@/app/ui/card";
import {
  CalculatorIcon,
  CalendarDaysIcon,
  ClockIcon,
  CurrencyDollarIcon,
  DocumentArrowUpIcon,
  DocumentIcon,
} from "@heroicons/react/24/outline";
import { DocumentTextIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const ProposalList = () => {
  const [activeTab, setActiveTab] = useState("proposal-list");
  const { data: session } = useSession();

  interface ContractOffer {
    id: string;
    title: string;
    company: string;
    price: string;
    paymentType: string;
    deadline: string;
    isNew: boolean;
  }

  const [contractOffers, setContractOffers] = useState<ContractOffer[]>([]);

  useEffect(() => {
    const fetchContractOffers = async () => {
      const response = await fetchWithAuth(
        `/api/fetch-contracts?freelancerId=${session?.user.id}`
      );
      const { data } = await response.json();

      // Map the response data to the ContractOffer structure
      const offers = data.map((offer: any) => ({
        id: offer._id,
        title: offer.jobId?.title, // Extract title from jobId
        company: offer.clientDetails?.fullName, // Extract company name from clientDetails
        price: offer.price.toString(), // Convert price to string if necessary
        paymentType: offer.paymentType,
        deadline: offer.deadline,
        isNew:
          new Date(offer.createdAt) >
          new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // Check if the offer is within the last 7 days
      }));

      setContractOffers(offers);
    };

    if (session?.user.id) {
      fetchContractOffers();
    }
  }, [session?.user.id]);

  return (
    <div>
      <div className="flex gap-10 border-b font-medium border-primary-400 mb-10 py-2">
        <span
          onClick={() => setActiveTab("proposal-list")}
          className={`cursor-pointer relative ${activeTab === "proposal-list" ? "active-tab" : ""}`}
        >
          Submited Proposals
        </span>
        <span
          onClick={() => setActiveTab("contract-offers")}
          className={`cursor-pointer relative ${activeTab === "contract-offers" ? "active-tab" : ""}`}
        >
          Contract Offers
        </span>
      </div>
      {activeTab === "contract-offers" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contractOffers.map((offer) => (
              <Card key={offer.id} className="overflow-hidden">
                <div className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="text-xl">{offer.title}</div>
                    {offer.isNew && (
                      <div className={`p-5 rounded-xl new-pin bg-primary-500`}>
                        new
                      </div>
                    )}
                  </div>
                  <div className="description">{offer.company}</div>
                </div>
                <div className="pb-3 content">
                  <div className="space-y-3">
                    <div className="flex items-center text-sm">
                      <CurrencyDollarIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{offer.price}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <CalculatorIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{offer.paymentType}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <ClockIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>
                        Deadline:{" "}
                        {new Date(offer.deadline).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="footer flex justify-between pt-3">
                  <Button>View Details</Button>
                  <Button>Submit Proposal</Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProposalList;
