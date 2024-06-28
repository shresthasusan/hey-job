import React from "react";
import ProfileCard from "../../ui/dashboard-components/profileCard";
import OrderCard from "../../ui/dashboard-components/orderCard";
import RatingCard from "../../ui/dashboard-components/rating-card/ratingCard";
import FinanceCard from "../../ui/dashboard-components/financeCard";
import ReviewsCard from "../../ui/dashboard-components/reviews-card/reviewsCard";
import SkeletonProfileCard from "@/app/ui/dashboard-components/skeletons/skeletonProfileCard";
import DashboardSkeleton from "@/app/ui/dashboard-components/dashboardSkeleton";
import ChatList from "@/app/ui/chat-component/chatList";

const Dashboard = () => {
  return (
    <>
      <div className="grid p-10 py-10 gap-5 dashboard:grid-rows-2  ">
        <div className=" flex flex-wrap justify-evenly   gap-x-3 gap-y-10  w-full ">
          <ProfileCard />
          <OrderCard />
          <RatingCard />
          <FinanceCard />
          <ReviewsCard />
        </div>
        <div className="w-full  grid grid-cols-2 ">
          <div
            className="w-1/3 min-w-[280px] h-1/3 rounded-3xl 
    shadow-[0_10px_20px_rgba(228,228,228,_0.7)] overflow-hidden"
          >
            <ChatList />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
