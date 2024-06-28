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
    <div className="rounded-xl m-auto max-w-[200px] relative h-4 bg-slate-200">
      <div
        className={clsx(
          "relative w-0 h-4 bg-primary-500 rounded-xl transition-all duration-300 ease-in-out ",
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
        <div className=" absolute   right-0 -translate-y-1/2 translate-x-5 ">
          <Emoji rating={rating} />
        </div>
      </div>
    </div>
  );
};

export default SliderRating;
