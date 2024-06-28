import React from "react";
import ProfileCard from "../../ui/dashboard-components/profileCard";
import OrderCard from "../../ui/dashboard-components/orderCard";
import RatingCard from "../../ui/dashboard-components/rating-card/ratingCard";
import FinanceCard from "../../ui/dashboard-components/financeCard";
import ReviewsCard from "../../ui/dashboard-components/reviews-card/reviewsCard";
import ChatList from "@/app/ui/chat-component/chatList";
import SearchInput from "@/app/ui/dashboard-components/job-posting/searchBar";
import Link from "next/link";
import JobList from "@/app/ui/dashboard-components/job-posting/jobList";

const Dashboard = () => {
  return (
    <>
      <div className="grid p-10 py-10 gap-10 dashboard:grid-rows-2  ">
        <div className=" flex flex-wrap justify-center lg:justify-between   md:gap-x-5 gap-y-10  w-full ">
          <ProfileCard />
          <OrderCard />
          <RatingCard />
          <FinanceCard />
          <ReviewsCard />
        </div>
        <div className="w-full gap-20 grid grid-cols-6 ">
          <div
            className=" min-w-[280px] h-1/3 rounded-3xl 
   border-0 overflow-hidden  shadow-[0_10px_20px_rgba(228,228,228,_0.7)]"
          >
            <ChatList />
          </div>
          <div className="w-full  col-span-5 ">
            <SearchInput />
            <div className=" w-[80%]">
              <h1 className="text-2xl font-medium mt-5">Jobs you might like</h1>
              <ul className="flex border-b-2 py-2 text-slate-600  flex-row gap-5 ">
                <li className="hover:text-primary-600">
                  <Link href={""}>Best Matches</Link>
                </li>
                <li className="hover:text-primary-600">
                  <Link href={""}>Most Recent</Link>
                </li>
                <li className="hover:text-primary-600">
                  <Link href={""}>Saved Jobs</Link>
                </li>
              </ul>
              <JobList />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
