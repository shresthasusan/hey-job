"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { use } from "react";

const JobNavBar = () => {
  const currentPath = usePathname();
  return (
    <ul className="flex border-b-4 mt-2 py-2 text-slate-600  flex-row gap-5 ">
      <li>
        <Link
          className={
            (clsx("hover:text-primary-600 "),
            currentPath == "/user/best-matches" ? "text-primary-600" : "")
          }
          href={"/user/best-matches"}
        >
          Best Matches
        </Link>
      </li>
      <li>
        <Link
          className={
            (clsx("hover:text-primary-600 "),
            currentPath == "/user/most-recent" ? "text-primary-600" : "")
          }
          href={"/user/most-recent"}
        >
          Most Recent
        </Link>
      </li>
      <li>
        <Link
          className={
            (clsx("hover:text-primary-600 "),
            currentPath == "/user/saved-jobs" ? "text-primary-600" : "")
          }
          href={"/user/saved-jobs"}
        >
          Saved Jobs
        </Link>
      </li>
    </ul>
  );
};

export default JobNavBar;
