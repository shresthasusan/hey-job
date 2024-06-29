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
            "h-1 w-full border-r-[5px] border-white   absolute -bottom-3",
            currentPath == "/user/best-matches" ? "bg-primary-600" : "hidden"
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
            "h-1 w-[110px] -left-1 border-x-[5px] border-white   absolute -bottom-3",
            currentPath == "/user/most-recent" ? "bg-primary-600" : "hidden"
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
            "h-1 w-[100px] -left-1 border-x-[5px] border-white   absolute -bottom-3",
            currentPath == "/user/saved-jobs" ? "bg-primary-600" : "hidden"
          )}
        />
      </li>
    </ul>
  );
};

export default JobNavBar;
