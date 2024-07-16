import ChatList from "../../ui/chat-component/chatList";
import ProfileCard from "../../ui/dashboard-components/profileCard";
import OrderCard from "../../ui/dashboard-components/orderCard";
import RatingCard from "../../ui/dashboard-components/rating-card/ratingCard";
import FinanceCard from "../../ui/dashboard-components/financeCard";
import ReviewsCard from "../../ui/dashboard-components/reviews-card/reviewsCard";
import JobNavBar from "../../ui/dashboard-components/job-posting/jobNavBar";
import SearchInput from "../../ui/dashboard-components/job-posting/searchBar";
import React, { Suspense } from "react";
import RightCard from "@/app/ui/dashboard-components/rightCard";

// root layout for client dashboard pages

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    // body of the page
    <div className="grid px-5 py-10 md:px-10 gap-16  dashboard:grid-rows-2  ">
      {/* profile card, order card, rating card, finance card, reviews card components */}
      <div className="   hidden xl:flex xl:justify-between   sm:gap-x-5 gap-y-10  w-full ">
        <ProfileCard />
        <OrderCard />
        <RatingCard />
        <FinanceCard />
        <ReviewsCard />
      </div>
      <div
        className="w-full 
      bg-white 
       gap-12 
       2xl:grid 
       2xl:grid-cols-5 "
      >
        {/* body section below the cards section */}
        <div className="  h-[770px] PB-5 hidden sticky top-28 2xl:block rounded-3xl">
          <Suspense>
            <ChatList />
          </Suspense>
        </div>
        {/* job posting space  */}
        <div className="w-full col-span-4 ">
          <div className="2xl:w-[75%] w-[90%]">{children}</div>
        </div>
      </div>
    </div>
  );
}
