import JobList from "@/app/ui/dashboard-components/job-list/jobList"; // Importing JobList component
import PostingSkeleton from "@/app/ui/dashboard-components/skeletons/postingSkeleton"; // Importing PostingSkeleton component
import { Suspense } from "react"; // Importing Suspense from React for lazy loading

// Functional component definition
const page = () => {
  return (
    // Wrapping JobList component with Suspense for lazy loading
    <Suspense fallback={<PostingSkeleton />}>
      <JobList mostRecent={true} />{" "}
      {/* Rendering JobList with query and mostRecent props */}
    </Suspense>
  );
};

export default page; // Exporting the page component as default
