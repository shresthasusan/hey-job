"use client";

import { useSession } from "next-auth/react";
import { Button } from "../../ui/button";
import AllJobsList from "@/app/ui/client-components/all-jobs/clientJobList";

const YourJobsPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const { data: session } = useSession();
  return (
    <>
      <div className="mx-auto text-center">
        <h1 className="font-bold text-5xl p-6">
          Jobs,{" "}
          <span className="text-yellow-400">
            {session?.user?.name} {session?.user?.lastName}
          </span>{" "}
          has posted.
        </h1>
        {id ? <AllJobsList userId={id} /> : <p>Loading...</p>}
      </div>
      <div className="flex justify-center mt-4">
        <Button
          className="px-20 py-8 text-xl bg-primary-500"
          onClick={() => (window.location.href = "/client/post-job")}
        >
          Post a Job Now
        </Button>
      </div>
    </>
  );
};

export default YourJobsPage;
