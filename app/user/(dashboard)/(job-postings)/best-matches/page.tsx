import JobList from "@/app/ui/dashboard-components/job-list/jobList";
import PostingSkeleton from "@/app/ui/dashboard-components/skeletons/postingSkeleton";
import { Suspense } from "react";

interface searchParams {
  title: string;
}

interface Props {
  searchParams?: searchParams | undefined;
}

const page = ({ searchParams }: Props) => {
  const query = searchParams?.title || "";
  console.log(query);
  return (
    <Suspense fallback={<PostingSkeleton />}>
      <JobList query={query} bestMatches={true} />
    </Suspense>
  );
};

export default page;
