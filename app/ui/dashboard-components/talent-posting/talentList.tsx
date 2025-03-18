"use client";

import { MapPinIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import StarRating from "../../starRating";
import PostingSkeleton from "../skeletons/postingSkeleton";
import SaveButton from "../../saveButton";
import Image from "next/image";
import { fetchWithAuth } from "@/app/lib/fetchWIthAuth";
import { useRouter } from "next/navigation";

const truncateString = (str: string, num: number) => {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + "... ";
};

interface Props {
  bestMatches?: boolean;
  savedFreelancers?: boolean;
  query?: string;
}

interface Freelancer {
  userId?: string;
  fullName?: string;
  email?: string;
  location: string;
  phone: string;
  skills: string[];
  bio: string;
  languages: string;
  rate: string;
  saved: boolean;
  profilePicture: string;
  reviews: {
    client: {
      rating: 0;
    };
    freelancer: {
      rating: 0;
    };
  };
}

const FreelancerList = ({ bestMatches, savedFreelancers, query }: Props) => {
  const [data, setData] = useState<Freelancer[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (bestMatches) params.append("bestMatches", "true");
        if (savedFreelancers) params.append("savedFreelancers", "true");
        if (query) {
          const queryParams = new URLSearchParams(query);
          queryParams.forEach((value, key) => {
            params.append(key, value);
          });
        }
        const response = await fetchWithAuth(`/api/freelancers?${params}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          next: { revalidate: 3600 },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const { freelancers } = await response.json();
        setData(freelancers);
      } catch (error) {
        console.error("Error fetching freelancers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [query, bestMatches, savedFreelancers]);

  const loadFreelancerDetails = (freelancer: Freelancer) => {
    const params = new URLSearchParams(window.location.search);
    params.set("freelancerId", freelancer.userId || "");
    router.push(`?${params.toString()}`, { scroll: false });
    console.log("Freelancer details loaded:", freelancer);
  };

  return (
    <div className="flex flex-col mt-8">
      {loading ? (
        <PostingSkeleton />
      ) : data.length === 0 ? (
        <p className="text-center text-gray-500">No freelancers found.</p>
      ) : (
        data.map((freelancer, index) => (
          <div key={index} className="relative">
            <div
              className="flex flex-col gap-1 p-5 border-t-2 border-gray-200 group"
              onClick={() => loadFreelancerDetails(freelancer)}
            >
              <div className="flex gap-3 items-center">
                <div className="rounded-full overflow-hidden w-[90px] h-[90px] flex items-center">
                  <Image
                    src={freelancer.profilePicture}
                    alt="freelancer dp"
                    width={90}
                    height={90}
                  />
                </div>
                <span className="flex flex-col gap-2">
                  <h1 className="text-2xl text-gray-500 font-medium group-hover:text-primary-500 transition-all duration-250">
                    {freelancer.fullName}
                  </h1>
                  <p className="text-xs text-green-300 bg-green-700 p-1 rounded-md w-28 text-center font-light">
                    Available Now
                  </p>
                </span>
              </div>
              <p className="text-xs mt-2 text-gray-400">
                Hourly Rate: {freelancer.rate} USD/hr - Contact:{" "}
                {freelancer.email} | {freelancer.phone}
              </p>
              <p className="text-black my-5">
                {truncateString(freelancer.bio, 400)}
                {freelancer.bio.length > 400 ? (
                  <button className="text-primary-700 hover:text-primary-500">
                    Read More
                  </button>
                ) : null}
              </p>
              <div className="flex justify-start gap-5 flex-wrap items-center">
                {freelancer.skills.map((skill, index) => (
                  <div
                    key={index}
                    className="bg-slate-200 text-slate-500 p-3 rounded-2xl"
                  >
                    {skill}
                  </div>
                ))}
              </div>
              <div className="flex items-center p-1 gap-3 mt-5">
                <p className="text-sm flex font-medium text-gray-500">
                  <MapPinIcon className="w-5 h-5" /> {freelancer.location}
                </p>
                <StarRating rating={freelancer.reviews.freelancer.rating} />
              </div>
            </div>
            <SaveButton
              itemId={freelancer.userId}
              saved={freelancer.saved}
              itemType="freelancer"
            />
          </div>
        ))
      )}
    </div>
  );
};

export default FreelancerList;
