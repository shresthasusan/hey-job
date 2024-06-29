import ChatList from "../../ui/chat-component/chatList";
import ProfileCard from "../../ui/dashboard-components/profileCard";
import OrderCard from "../../ui/dashboard-components/orderCard";
import RatingCard from "../../ui/dashboard-components/rating-card/ratingCard";
import FinanceCard from "../../ui/dashboard-components/financeCard";
import ReviewsCard from "../../ui/dashboard-components/reviews-card/reviewsCard";
import JobNavBar from "../../ui/dashboard-components/job-posting/jobNavBar";
import SearchInput from "../../ui/dashboard-components/job-posting/searchBar";
import React from "react";
import RightCard from "@/app/ui/dashboard-components/rightCard";

export const experimental_ppr = true;
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid p-10 py-10 gap-16  dashboard:grid-rows-2  ">
      <div className=" flex flex-wrap  lg:justify-between   md:gap-x-5 gap-y-10  w-full ">
        <ProfileCard />
        <OrderCard />
        <RatingCard />
        <FinanceCard />
        <ReviewsCard />
      </div>
      <div className="w-full   bg-white  gap-12 2xl:grid 2xl:grid-cols-5 ">
        <div
          className="  h-1/3 hidden sticky top-28 2xl:block rounded-3xl  
    "
        >
          <ChatList />
        </div>
        <div className="w-full col-span-4 ">
          <div className="sticky top-[75px]  pt-5   bg-white">
            <SearchInput />
            <h1 className="text-2xl font-medium mt-5">Jobs you might like</h1>
            <JobNavBar />
          </div>

          <div className="w-[75%]">{children}</div>
        </div>
      </div>
    </div>
  );
}
