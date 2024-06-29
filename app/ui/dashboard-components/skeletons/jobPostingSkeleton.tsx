import React from "react";

const JobPostingSkeleton = () => {
  return (
    <>
      <div className="w-full flex gap-10 flex-col col-span-3">
        <div className="flex flex-col gap-4">
          <div className="h-3 bg-gray-200 rounded-full dark:bg-slate-200 w-48 mb-4"></div>
          <div className="h-3 bg-gray-200 rounded-full dark:bg-slate-200 max-w-[600px] mb-2.5"></div>
          <div className="h-3 bg-gray-200 rounded-full dark:bg-slate-200 mb-2.5"></div>
          <div className="h-3 bg-gray-200 rounded-full dark:bg-slate-200 max-w-[500px] mb-2.5"></div>
          <div className="h-3 bg-gray-200 rounded-full dark:bg-slate-200 max-w-[540px] mb-2.5"></div>
          <div className="h-3 bg-gray-200 rounded-full dark:bg-slate-200 max-w-[360px]"></div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="h-3 bg-gray-200 rounded-full dark:bg-slate-200 w-48 mb-4"></div>
          <div className="h-3 bg-gray-200 rounded-full dark:bg-slate-200 max-w-[600px] mb-2.5"></div>
          <div className="h-3 bg-gray-200 rounded-full dark:bg-slate-200 mb-2.5"></div>
          <div className="h-3 bg-gray-200 rounded-full dark:bg-slate-200 max-w-[500px] mb-2.5"></div>
          <div className="h-3 bg-gray-200 rounded-full dark:bg-slate-200 max-w-[520px] mb-2.5"></div>
          <div className="h-3 bg-gray-200 rounded-full dark:bg-slate-200 max-w-[360px]"></div>
        </div>
      </div>
    </>
  );
};

export default JobPostingSkeleton;
