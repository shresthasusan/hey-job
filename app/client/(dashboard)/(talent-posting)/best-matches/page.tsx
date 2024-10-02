import FreelancerList from "@/app/ui/dashboard-components/talent-posting/talentList";
import { Suspense } from "react";
import Loading from "../loading";

interface searchParams {
  search: string;
}

interface Props {
  searchParams?: searchParams | undefined;
}

const page = ({ searchParams }: Props) => {
  const query = searchParams?.search || "";
  console.log("from frontend", query);
  return (
    <Suspense fallback={<Loading />}>
      <FreelancerList query={query} bestMatches={true} />
    </Suspense>
  );
};

export default page;
