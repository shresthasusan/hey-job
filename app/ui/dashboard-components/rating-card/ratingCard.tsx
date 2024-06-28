import React from "react";
import SliderRating from "./slider";

const Rating = () => {
  const rating = 3.5;
  return (
    <div className=" min-w-[250px] flex flex-col gap-5 justify-center items-center relative rounded-3xl h-[250px] p-5 overflow-hidden shadow-[0_10px_20px_rgba(228,228,228,_0.7)]">
      <h1 className="text-3xl font-semibold"> Rating</h1>
      {/* <div className="w-full flex gap-2  flex-col ">
        <div className="bg-primary-400 text-primary-700 relative rounded-3xl p-1 pl-10">
    
        </div>
        <div className="bg-sucess-400 text-sucess-600 relative rounded-3xl p-1 pl-10">
          <p>2 Completed</p>
          <CheckBadgeIcon className="h-5 w-5 absolute -translate-y-[50%]  left-3 top-1/2 " />
        </div>
      </div> */}
      <h1 className="text-6xl">{rating}</h1>

      <div className="w-full">
        <SliderRating rating={rating} />
      </div>
    </div>
  );
};

export default Rating;