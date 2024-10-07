import JobList from "@/app/ui/dashboard-components/job-list/jobList";
import PostingSkeleton from "@/app/ui/dashboard-components/skeletons/postingSkeleton";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";

interface searchParams {
  title: string;
}

// Defining the interface for component props
interface Props {
  searchParams?: searchParams | undefined;
}

const page = ({ searchParams }: Props) => {
  const query = searchParams?.title || "";
  return (
    <Suspense fallback={<PostingSkeleton />}>
      <JobList query={query} bestMatches={true} />
    </Suspense>
  );
};

export default page;
