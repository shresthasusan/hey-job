"use client";

import { useState, useEffect } from "react";
import { HeartIcon as Unliked, MapPinIcon } from "@heroicons/react/24/outline";
import { HeartIcon as Liked } from "@heroicons/react/24/solid";
import StarRating from "../../starRating";
import PostingSkeleton from "../skeletons/postingSkeleton";
import SaveButton from "../../saveButton";
import Loading from "@/app/client/(dashboard)/loading";

const truncateString = (str: any, num: any) => {
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

type Freelancer = {
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
};

const FreelancerList = ({ bestMatches, savedFreelancers, query }: Props) => {
  const [data, setData] = useState<Freelancer[]>([]);
  const [loading, setLoading] = useState(true); // Add loading state

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
        const response = await fetch(`/api/freelancers?${params}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          next: {
            revalidate: 3600, // 1 hour
          },
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

  return (
    <div className="flex flex-col mt-8">
      {loading ? (
        <PostingSkeleton /> // Show the loading component when fetching data
      ) : data.length === 0 ? (
        <p className="text-center text-gray-500">No freelancers found.</p>
      ) : (
        data.map((freelancer, index) => (
          <div
            key={index}
            className="flex flex-col gap-1 p-5 border-t-2 border-gray-200"
          >
            <p className="text-xs text-gray-400">Available</p>
            <div className="flex items-center justify-between">
              <h1 className="text-2xl text-gray-500 font-medium">
                {freelancer.fullName}
              </h1>
              <SaveButton
                itemId={freelancer.userId}
                saved={freelancer.saved}
                itemType={"freelancer"}
              />
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
              <StarRating rating={3.5} />
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default FreelancerList;
