import FreelancerList from "@/app/ui/dashboard-components/talent-posting/talentList";
import { Suspense } from "react";

interface searchParams {
  talentName: string;
}

interface Props {
  searchParams?: searchParams | undefined;
}

const page = ({ searchParams }: Props) => {
  const query = searchParams?.talentName || "";
  console.log(query);
  return (
    <Suspense>
      <FreelancerList query={query} bestMatches={true} />
    </Suspense>
  );
};

export default page;
