import React from "react";
import SkeletonProfileCard from "./skeletons/skeletonProfileCard";
import FinanceCard from "./financeCard";
import OrderCard from "./orderCard";
import RatingCard from "./rating-card/ratingCard";
import ReviewSkeletonCard from "./skeletons/reviewSkeletonCard";
import OrderSkeletonCard from "./skeletons/orderSkeletonCard";
import RatingSkeletonCard from "./skeletons/ratingSkeletonCard";
import FinanceSkeletonCard from "./skeletons/financeSkeletonCard";

const DashboardSkeleton = () => {
  return (
    <>
      <div className="grid  grid-rows-2 ">
        <div className=" flex flex-wrap justify-evenly   items-center gap-x-3 gap-y-10 p-10 py-16 w-full ">
          <SkeletonProfileCard />
          <OrderSkeletonCard />
          <RatingSkeletonCard />
          <FinanceSkeletonCard />
          <ReviewSkeletonCard />
        </div>
      </div>
    </>
  );
};

export default DashboardSkeleton;
