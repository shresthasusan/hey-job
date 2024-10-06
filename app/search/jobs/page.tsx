"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

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
}

const page = ({ query }: Props) => {
  const [data, setData] = useState<Freelancer[]>([]);
  const searchParams = useSearchParams();

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        console.log("passed query", query); // query
        const response = await fetch(
          `/api/freelancers?query=${searchParams.get("query")}`,
          // "/api/freelancers",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            next: {
              revalidate: 3600, // 1 hour
            },
          }
        );
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
  return <div>page</div>;
};

export default page;
