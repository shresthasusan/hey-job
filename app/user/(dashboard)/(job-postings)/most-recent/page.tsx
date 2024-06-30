import JobList from "@/app/ui/dashboard-components/job-posting/jobList";

interface searchParams {
  title: string;
}

interface Props {
  searchParams?: searchParams | undefined;
}

const page = ({ searchParams }: Props) => {
  const query = searchParams?.title || "";
  return <JobList query={query} mostRecent={true} />;
};

export default page;
