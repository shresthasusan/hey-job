"use client";

import React, { useEffect, useState } from "react";
import SliderRating from "./slider"; // Assuming SliderRating is a component that shows a rating slider
import clsx from "clsx";

const Rating = () => {
  const rating = 0; // Target rating value
  const initialValue = 0; // Initial rating value
  const [count, setCount] = useState(initialValue); // State to hold the current rating value
  const duration = 100; // Duration of the animation in milliseconds

  useEffect(() => {
    const startValue = initialValue;
    const targetValue = rating;
    const interval = Math.floor(duration / (targetValue - startValue)); // Calculate interval for each increment

    const incrementCount = (i: number) => {
      if (i <= targetValue) {
        setCount(parseFloat(i.toFixed(1))); // Update the count
        setTimeout(() => incrementCount(i + 0.1), interval); // Increment the count
      }
    };

    incrementCount(startValue); // Start the increment process
  }, [rating, initialValue, duration]); // Dependencies array to re-run effect if any dependencies change

  return (
    <div className="min-w-[250px] w-[15%] flex flex-col gap-1 justify-center items-center relative rounded-3xl h-[250px] p-5 overflow-hidden shadow-[0_10px_20px_rgba(228,228,228,_0.7)]">
      <h1 className="text-3xl font-medium">Rating</h1>
      <h1
        className={clsx("text-8xl font-semibold", {
          "text-red-700": count <= 1,
          "text-red-500": count > 1 && count <= 2,
          "text-amber-500": count > 2 && count <= 3,
          "text-green-400": count > 3 && count <= 4,
          "text-green-600": count > 4,
        })}
      >
        {count}
      </h1>
      <div className="w-full">
        <SliderRating rating={rating} />
      </div>
    </div>
  );
};

export default Rating;
