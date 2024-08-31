"use client";

import { freelancersData } from "@/app/lib/data";
import { HeartIcon as Unliked, MapPinIcon } from "@heroicons/react/24/outline";
import { HeartIcon as Liked } from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";
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
  name: string;
  title: string;
  type: string; // e.g., "Hourly - Intermediate"
  experience: string; // e.g., "Intermediate"
  hourlyRate: number;
  rating: number; // Out of 5
  description: string;
  skills: string[]; // Replaces "tags"
  location: string;
  available: boolean; // Replaces "saved"
  saved: boolean;
}

// interface Freelancer {
//   userId: string;
//   professionalEmail: string;
//   location: string;
//   phone: string;
//   skills: string[];
//   experience: string;
//   education: string;
//   portfolio: string;
//   certificate: string;
//   bio: string;
//   languages: string[];
//   rate: string;
// }

// Assuming FreelancersData, recent, and a way to filter saved Freelancers are available in the scope
// For saved Freelancers, assuming there's a need to filter FreelancersData or recent based on the saved property
const FreelancerList = ({ bestMatches, savedFreelancers, query }: Props) => {
  const [data, setData] = useState<Freelancer[]>([]); // Corrected the type to Freelancer[] and initialized as an empty array

  useEffect(() => {
    let filteredData: Freelancer[] = []; // Temporary array to hold filtered data
    if (bestMatches) {
      // Assuming bestMatches logic is to show all Freelancers from FreelancersData for this example
      filteredData = freelancersData;
    } else if (savedFreelancers) {
      // Assuming we filter FreelancersData for saved Freelancers, similar logic can be applied to 'recent' if needed
      filteredData = freelancersData.filter((Freelancer) => Freelancer.saved);
    }

    if (query) {
      const queryWords = query.toLowerCase().split(/\s+/); // Split query into words or letters, and convert to lowercase for case-insensitive matching
      filteredData = filteredData.filter(
        (Freelancer) =>
          queryWords.some((word) =>
            Freelancer.title.toLowerCase().includes(word)
          ) ||
          Freelancer.skills.some((tag) =>
            queryWords.some((word) => tag.toLowerCase().includes(word))
          )
      );
    }

    setData(filteredData); // Update the state with the filtered data
  }, [bestMatches, savedFreelancers, query]);

  // Render logic or other operations can go here

  return (
    <div className="flex boader flex-col mt-8  ">
      {data.map((Freelancer, index) => (
        <div
          key={index}
          className={`flex flex-col gap-1  p-5 border-t-2  border-gray-200 `}
        >
          <p className="text-xs text-gray-400">
            {" "}
            {Freelancer.available == true ? "available" : "unavailable"}
          </p>
          <div className="flex items-center justify-between ">
            <h1 className="text-2xl text-gray-500  font-medium">
              {Freelancer.title}
            </h1>
            {Freelancer.saved ? (
              <Liked className="w-6 h-6 text-red-600 " />
            ) : (
              <Unliked className="w-6 h-6  " />
            )}
          </div>
          <p className="text-xs mt-2 text-gray-400">
            {Freelancer.type} - {Freelancer.experience} - Rate:{" "}
            {Freelancer.hourlyRate} USD/hr
          </p>
          <p className="text-black my-5 ">
            {truncateString(Freelancer.description, 400)}
            {Freelancer.description.length > 400 ? (
              <button className="text-primary-700 hover:text-primary-500">
                Read More
              </button>
            ) : null}
          </p>

          <div className="flex justify-start gap-5 flex-wrap items-center">
            {Freelancer.skills.map((tag, index) => (
              <div
                key={index}
                className="bg-slate-200 text-slate-500 p-3 flex flex-wrap justify-center items-center  rounded-2xl"
              >
                {tag}
              </div>
            ))}
          </div>
          <div className="flex items-center p-1 gap-3 mt-5">
            <p className="text-sm  flex font-medium  text-gray-500">
              <MapPinIcon className="w-5 h-5 " /> {Freelancer.location}
            </p>
            <StarRating rating={Freelancer.rating} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default FreelancerList;
