import JobList from "@/app/ui/dashboard-components/job-list/jobList";
import SearchBar from "@/app/ui/dashboard-components/job-list/searchBar";
import PostingSkeleton from "@/app/ui/dashboard-components/skeletons/postingSkeleton";

import ExpertiseFilter from "@/app/ui/filter/experitise-level/expertiseFilter";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";

interface searchParams {
  title: string;
  Entry?: string;
  Intermediate?: string;
  Expert?: string;
}

// Defining the interface for component props
interface Props {
  searchParams?: searchParams | undefined;
}

const page = ({ searchParams }: Props) => {
  const query = new URLSearchParams(searchParams as any).toString();
  return (
    <div className="flex-col flex w-full gap-10 mt-5">
      <SearchBar />
      <div className="flex">
        <div className="border-r-2 px-14 w-1/4 relative ">
          <ExpertiseFilter />
        </div>
        <Suspense fallback={<PostingSkeleton />}>
          <JobList query={query} />
        </Suspense>
      </div>
    </div>
  );
};

export default page;
