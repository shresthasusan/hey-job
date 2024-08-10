"use client";

import React, { useEffect, useState } from "react";
import SliderRating from "./slider";
import clsx from "clsx";

const Rating = () => {
  const rating = 4.6;
  const initialValue = 0;
  const targetValue = rating;
  const [count, setCount] = useState(initialValue);
  const duration = 100; // 4 seconds

  useEffect(() => {
    let startValue = initialValue;
    const interval = Math.floor(duration / (targetValue - initialValue));

    const incrementCount = (i: number) => {
      if (i <= targetValue) {
        setCount(parseFloat(i.toFixed(1)));
        setTimeout(() => incrementCount(i + 0.1), interval);
      }
    };

    incrementCount(startValue);
  }, [targetValue, initialValue]);
  return (
    <div
      className=" min-w-[250px] w-[15%] flex flex-col gap-1 justify-center items-center relative rounded-3xl h-[250px] p-5 overflow-hidden 
    shadow-[0_10px_20px_rgba(228,228,228,_0.7)]"
    >
      <h1 className="text-3xl font-medium"> Rating</h1>
      {/* <div className="w-full flex gap-2  flex-col ">
        <div className="bg-primary-400 text-primary-700 relative rounded-3xl p-1 pl-10">
    
        </div>
        <div className="bg-sucess-400 text-sucess-600 relative rounded-3xl p-1 pl-10">
          <p>2 Completed</p>
          <CheckBadgeIcon className="h-5 w-5 absolute -translate-y-[50%]  left-3 top-1/2 " />
        </div>
      </div> */}
      <h1
        className={clsx("text-8xl  font-semibold", {
          "text-red-700": count <= 1,
          "text-red-500": count > 1 && count <= 2,
          "text-amber-500": count > 2 && count <= 3,
          "text-green-400": count > 3 && count <= 4,
          "text-green-600": count > 4,
        })}
      >
        {count}
      </h1>

      <div className="w-full  ">
        <SliderRating rating={targetValue} />
      </div>
    </div>
  );
};

export default Rating;
