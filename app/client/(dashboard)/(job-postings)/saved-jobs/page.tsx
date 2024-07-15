import JobList from "@/app/ui/dashboard-components/job-posting/jobList";
import { Suspense } from "react";

interface searchParams {
  title: string;
}

interface Props {
  searchParams?: searchParams | undefined;
}

const page = ({ searchParams }: Props) => {
  const query = searchParams?.title || "";
  return (
    <Suspense>
      <JobList query={query} savedJobs={true} />
    </Suspense>
  );
};

export default page;
