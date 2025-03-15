import FreelancerList from "@/app/ui/dashboard-components/talent-posting/talentList";
import { Suspense } from "react";
import Loading from "../loading";

const page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <FreelancerList bestMatches={true} />
    </Suspense>
  );
};

export default page;
