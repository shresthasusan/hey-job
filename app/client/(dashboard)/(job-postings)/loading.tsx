import JobPostingSkeleton from "@/app/ui/dashboard-components/skeletons/jobPostingSkeleton";
import React from "react";

const loading = () => {
  return (
    <div className="py-5">
      <JobPostingSkeleton />
    </div>
  );
};

export default loading;
