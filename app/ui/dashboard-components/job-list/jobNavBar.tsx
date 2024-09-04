"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { use } from "react";

const JobNavBar = () => {
  const currentPath = usePathname();
  return (
    <ul className="flex border-b-4 mt-2 py-2 text-slate-600  flex-row gap-5 ">
      <li className="relative">
        <Link
          className={
            (clsx("hover:text-primary-600  "),
            currentPath == "/user/best-matches" ? "text-primary-600" : "")
          }
          href={"/user/best-matches"}
        >
          Best Matches
        </Link>
        <div
          className={clsx(
            "h-1  border-r-[5px] bg-primary-600 transition-all duration-80 ease-in-out   absolute -bottom-3",
            currentPath == "/user/best-matches"
              ? "w-full  opacity-100 border-white"
              : "w-0 opacity-0"
          )}
        />
      </li>
      <li className="relative">
        <Link
          className={
            (clsx("hover:text-primary-600 "),
            currentPath == "/user/most-recent" ? "text-primary-600" : "")
          }
          href={"/user/most-recent"}
        >
          Most Recent
        </Link>
        <div
          className={clsx(
            "h-1  -left-1 border-x-[5px]  bg-primary-600 transition-all duration-80 ease-in-out  absolute -bottom-3",
            currentPath == "/user/most-recent"
              ? "w-[110px] opacity-100 border-white"
              : "w-0 opacity-0"
          )}
        />
      </li>
      <li className="relative">
        <Link
          className={
            (clsx("hover:text-primary-600 "),
            currentPath == "/user/saved-jobs" ? "text-primary-600" : "")
          }
          href={"/user/saved-jobs"}
        >
          Saved Jobs
        </Link>
        <div
          className={clsx(
            "h-1  -left-1 border-x-[5px]  transition-all duration-80 ease-in-out bg-primary-600 absolute -bottom-3",
            currentPath == "/user/saved-jobs"
              ? "w-[100px] opacity-100 border-white"
              : "w-0 opacity-0"
          )}
        />
      </li>
    </ul>
  );
};

export default JobNavBar;
