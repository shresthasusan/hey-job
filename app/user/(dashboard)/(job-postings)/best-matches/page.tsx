// Importing necessary components and hooks
import JobList from "@/app/ui/dashboard-components/job-list/jobList";
import PostingSkeleton from "@/app/ui/dashboard-components/skeletons/postingSkeleton";
import { Suspense } from "react";

// Main page component
const page = () => {
  return (
    // Wrapping JobList component with Suspense to show a fallback while loading
    <Suspense fallback={<PostingSkeleton />}>
      <JobList bestMatches={true} />
    </Suspense>
  );
};

// Exporting the page component as the default export
export default page;
