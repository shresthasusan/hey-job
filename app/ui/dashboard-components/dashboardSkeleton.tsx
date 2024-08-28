import React from "react";
import SkeletonProfileCard from "./skeletons/skeletonProfileCard";
import FinanceCard from "./financeCard";
import OrderCard from "./orderCard";
import RatingCard from "./rating-card/ratingCard";
import ReviewSkeletonCard from "./skeletons/reviewSkeletonCard";
import OrderSkeletonCard from "./skeletons/orderSkeletonCard";
import RatingSkeletonCard from "./skeletons/ratingSkeletonCard";
import FinanceSkeletonCard from "./skeletons/financeSkeletonCard";
import JobPostingSkeleton from "./skeletons/postingSkeleton";
import ChatListSkeleton from "./skeletons/chatListSkeleton";

const DashboardSkeleton = () => {
  return (
    <>
      <div className="grid  grid-rows-4  overflow-hidden gap-10 ">
        <div className=" flex flex-wrap justify-evenly row-span-1  items-center gap-x-3 gap-y-10 p-10 py-4 w-full ">
          <SkeletonProfileCard />
          <OrderSkeletonCard />
          <RatingSkeletonCard />
          <FinanceSkeletonCard />
          <ReviewSkeletonCard />
        </div>
        <div className="w-full row-span-3 px-12 grid grid-cols-5 gap-10">
          <ChatListSkeleton />
          <JobPostingSkeleton />
        </div>
      </div>
    </>
  );
};

export default DashboardSkeleton;
