"use client";

import { useState, useEffect } from "react";
import { HeartIcon as Unliked, MapPinIcon } from "@heroicons/react/24/outline";
import { HeartIcon as Liked } from "@heroicons/react/24/solid";
import StarRating from "../../starRating";

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
  userId: string;
  fullName: string;
  professionalEmail: string;
  location: string;
  phone: string;
  skills: string[];
  experience: string;
  education: string;
  portfolio: string;
  certificate: string;
  bio: string;
  languages: string[];
  rate: string;
  // available: boolean;
  // saved: boolean;
  // title: string;
  // type: string;
  // hourlyRate: number;
  // rating: number;
  // description: string;
}

const FreelancerList = ({ bestMatches, savedFreelancers, query }: Props) => {
  const [data, setData] = useState<Freelancer[]>([]);
  const controller = new AbortController();
  const signal = controller.signal;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/freelancers", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const { freelancers } = await response.json();
        setData(freelancers);
      } catch (error) {
        console.error("Error fetching freelancers:", error);
      }
    };
    fetchData();
    return () => {
      controller.abort();
    };
  }, []);

  // useEffect(() => {

  //   let filteredData: Freelancer[] = data;
  //   if (savedFreelancers) {
  //       filteredData = data.filter((freelancer) => freelancer.saved); // Filter saved freelancers
  //     }
  //      use query based api for better performance and less data fetching

  //   if (query) {
  //     const queryWords = query.toLowerCase().split(/\s+/);
  //     filteredData = filteredData.filter(
  //       (freelancer) =>
  //         queryWords.some((word) =>
  //           freelancer.fullName.toLowerCase().includes(word)
  //         ) ||
  //         freelancer.skills.some((tag) =>
  //           queryWords.some((word) => tag.toLowerCase().includes(word))
  //         )
  //     );
  //   }

  //   setData(filteredData);
  // }, [bestMatches, savedFreelancers, query, data]);

  return (
    <div className="flex boader flex-col mt-8">
      {data.map((freelancer, index) => (
        <div
          key={index}
          className={`flex flex-col gap-1 p-5 border-t-2 border-gray-200`}
        >
          {/* <p className="text-xs text-gray-400">
          {freelancer.available ? "available" : "unavailable"} 
          // available status
          </p> */}

          <p className="text-xs text-gray-400">available</p>
          <div className="flex items-center justify-between">
            <h1 className="text-2xl text-gray-500 font-medium">
              {freelancer.fullName}
            </h1>
            {/* {freelancer.saved ? (
              <Liked className="w-6 h-6 text-red-600" /> 
            ) : (
              <Unliked className="w-6 h-6" />
            )} */}
            {/* saved status */}
            <Liked className="w-6 h-6 text-red-600" />
          </div>
          <p className="text-xs mt-2 text-gray-400">
            {/* {freelancer.type}  */}
            Hourly - {freelancer.experience} - Rate: {freelancer.rate} USD/hr -
            contact: {freelancer.professionalEmail} | {freelancer.phone} -
            education: {freelancer.education}
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
            {freelancer.skills.map((tag, index) => (
              <div
                key={index}
                className="bg-slate-200 text-slate-500 p-3 flex flex-wrap justify-center items-center rounded-2xl"
              >
                {tag}
              </div>
            ))}
          </div>
          <div className="flex items-center p-1 gap-3 mt-5">
            <p className="text-sm flex font-medium text-gray-500">
              <MapPinIcon className="w-5 h-5" /> {freelancer.location}
            </p>
            {/* <StarRating rating={freelancer.rating} />  // rating*/}
            <StarRating rating={3.5} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default FreelancerList;
