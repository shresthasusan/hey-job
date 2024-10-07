import FreelancerList from "@/app/ui/dashboard-components/talent-posting/talentList";
import { Suspense } from "react";
import Loading from "../loading";

interface searchParams {
  talentName: string;
}

interface Props {
  searchParams?: searchParams | undefined;
}

const page = ({ searchParams }: Props) => {
  return (
    <Suspense fallback={<Loading />}>
      <FreelancerList bestMatches={true} />
    </Suspense>
  );
};

export default page;
