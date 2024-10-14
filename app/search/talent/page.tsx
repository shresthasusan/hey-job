import PostingSkeleton from "@/app/ui/dashboard-components/skeletons/postingSkeleton";
import SearchBar from "@/app/ui/dashboard-components/talent-posting/searchBar";
import FreelancerList from "@/app/ui/dashboard-components/talent-posting/talentList";
import ExpertiseFilter from "@/app/ui/filter/experitise-level/expertiseFilter";

import React, { Suspense } from "react";

interface searchParams {
  talentName: string;
  Entry?: string;
  Intermediate?: string;
  Expert?: string;
}

// Defining the interface for component props
interface Props {
  searchParams?: searchParams | undefined;
}

const page = ({ searchParams }: Props) => {
  // Convert searchParams to a query string
  const query = new URLSearchParams(searchParams as any).toString();
  console.log(query);

  return (
    <div className="flex-col flex w-full gap-10">
      <SearchBar />
      <div className="flex">
        <div className="border-r-2 px-14 w-1/4 relative ">
          <ExpertiseFilter />
        </div>
        <Suspense fallback={<PostingSkeleton />}>
          <FreelancerList query={query} />
        </Suspense>
      </div>
    </div>
  );
};

export default page;
