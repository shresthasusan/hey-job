import FreelancerList from "@/app/ui/dashboard-components/talent-posting/talentList";
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
      <FreelancerList query={query} savedFreelancers={true} />
    </Suspense>
  );
};

export default page;
