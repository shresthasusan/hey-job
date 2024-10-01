// Importing necessary components and hooks
import JobList from "@/app/ui/dashboard-components/job-list/jobList";
import PostingSkeleton from "@/app/ui/dashboard-components/skeletons/postingSkeleton";
import { Suspense } from "react";

// Defining the interface for search parameters
interface searchParams {
  title: string;
}

// Defining the interface for component props
interface Props {
  searchParams?: searchParams | undefined;
}

// Main page component
const page = ({ searchParams }: Props) => {
  // Extracting the query parameter from searchParams
  const query = searchParams?.title || "";

  return (
    // Wrapping JobList component with Suspense to show a fallback while loading
    <Suspense fallback={<PostingSkeleton />}>
      <JobList query={query} savedJobs={true} />
    </Suspense>
  );
};

// Exporting the page component as the default export
export default page;
