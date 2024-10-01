import JobList from "@/app/ui/dashboard-components/job-list/jobList"; // Importing JobList component
import PostingSkeleton from "@/app/ui/dashboard-components/skeletons/postingSkeleton"; // Importing PostingSkeleton component
import { Suspense } from "react"; // Importing Suspense from React for lazy loading

// Interface for search parameters
interface searchParams {
  title: string;
}

// Interface for component props
interface Props {
  searchParams?: searchParams | undefined;
}

// Functional component definition
const page = ({ searchParams }: Props) => {
  // Extracting the title from searchParams or setting it to an empty string if undefined
  const query = searchParams?.title || "";
  console.log(query); // Logging the query to the console

  return (
    // Wrapping JobList component with Suspense for lazy loading
    <Suspense fallback={<PostingSkeleton />}>
      <JobList query={query} mostRecent={true} />{" "}
      {/* Rendering JobList with query and mostRecent props */}
    </Suspense>
  );
};

export default page; // Exporting the page component as default
