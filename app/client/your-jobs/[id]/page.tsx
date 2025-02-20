"use client";

import AllJobsPage from "@/app/ui/client-components/all-jobs/page";
import { useSession } from "next-auth/react";
import { Button } from "../../../ui/button";
import { Suspense } from "react";
import Link from "next/link";

const YourJobsPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  return (
    <>
      <div className="mx-auto text-center">
        <h1 className="font-bold text-5xl p-6">
          {/* Jobs, <span className='text-yellow-400'>{session?.user?.name} {session?.user?.lastName}</span> has posted. */}
        </h1>
        <Suspense fallback={<>Loading</>}>
          {" "}
          <AllJobsPage userId={id} />
        </Suspense>
      </div>
      <div className="flex justify-center mt-4">
        <Link className="px-20 py-8 text-xl" href="/client/post-job">
          Post a Job Now
        </Link>
      </div>
    </>
  );
};

export default YourJobsPage;
