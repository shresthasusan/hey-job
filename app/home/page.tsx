import React from "react";
import ProfileCard from "../ui/dashboard-components/profileCard";
import OrderCard from "../ui/dashboard-components/orderCard";
import RatingCard from "../ui/dashboard-components/rating-card/ratingCard";
import FinanceCard from "../ui/dashboard-components/financeCard";
import ReviewsCard from "../ui/dashboard-components/reviews-card/reviewsCard";

const Dashboard = () => {
  return (
    <>
      <div className="grid  grid-rows-2 ">
        <div className=" flex flex-wrap justify-evenly   items-center gap-x-3 gap-y-10 p-10 py-16 w-full ">
          <ProfileCard />
          <OrderCard />
          <RatingCard />
          <FinanceCard />
          <ReviewsCard />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
