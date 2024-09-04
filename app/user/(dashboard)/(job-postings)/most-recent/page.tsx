import JobList from "@/app/ui/dashboard-components/job-list/jobList";
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
    <Suspense>
      <JobList query={query} mostRecent={true} />
    </Suspense>
  );
};

export default page;
