import React from "react";
import styled from "styled-components"; // Add this import
import clsx from "clsx";
import exp from "constants";
import Emoji from "./Emoji";

interface userRating {
  rating: number;
}

const SliderRating = ({ rating }: userRating) => {
  return (
    <div className="flex flex-ro gap-1">
      <p className="text-slate-500">0</p>
      <div className="rounded-xl m-auto max-w-[200px] w-full relative h-[12px] bg-slate-200">
        <div
          className={clsx(
            "relative w-0 h-[12px]  rounded-xl transition-all duration-300 ease-in-out ",
            {
              "bg-red-700": rating <= 1,
              "bg-red-500": rating > 1 && rating <= 2,
              "bg-amber-500": rating > 2 && rating <= 3,
              "bg-green-400": rating > 3 && rating <= 4,
              "bg-green-600": rating > 4,
            }
          )}
          style={{ width: `${rating * 20}%` }}
        >
          <div
            className={clsx(
              " absolute h-7 w-[8px]  top-0 right-[5px] -translate-y-[25%] bg-white "
            )}
          >
            {/* <Emoji rating={rating} /> */}
          </div>
          <div
            className={clsx(
              " absolute h-7 w-[2px] rounded-3xl top-0 right-2 -translate-y-[25%] ",
              {
                "bg-red-700": rating <= 1,
                "bg-red-500": rating > 1 && rating <= 2,
                "bg-amber-500": rating > 2 && rating <= 3,
                "bg-green-400": rating > 3 && rating <= 4,
                "bg-green-600": rating > 4,
              }
            )}
          >
            {/* <Emoji rating={rating} /> */}
          </div>
        </div>
        {/* <hr className="absolute w-1 h-7 translate-x-1/2  top-0 -translate-y-1/2 right-1/2  border-4 px-1 border-white rounded  dark:bg-primary-700"></hr> */}
      </div>
      <p className="text-slate-500">5</p>
    </div>
  );
};

export default SliderRating;
