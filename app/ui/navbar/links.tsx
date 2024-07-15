"use client";

import { ChevronDownIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

interface Props {
  isOpen: boolean;
}

const Links = () => {
  const currentPath = usePathname();
  const [isDropdownVisible, setDropdownVisible] = useState("0");

  console.log(currentPath);
  return (
    <>
      <ul className="lg:flex  mx-5 p-2 hidden font-medium text-sm gap-5 content-center items-center">
        <li>
          <div
            className=" flex flex-row align-items-center justify-center relative"
            onMouseEnter={() => setDropdownVisible("1")}
            onMouseLeave={() => setDropdownVisible("0")}
          >
            <Link
              href="/user/best-matches"
              className={clsx("hover:text-primary-600", {
                "text-primary-600":
                  currentPath == "/user/best-matches" ||
                  currentPath == "/user/most-recent" ||
                  currentPath == "/user/saved-jobs",
              })}
            >
              Dashboard
            </Link>
            <ChevronDownIcon className="h-5 w-5 ml-1" />
            {isDropdownVisible === "1" && (
              <div className="absolute text-black left-0 shadow-[0_0px_20px_rgba(228,228,228,1)] rounded-xl before:absolute before:-top-2 before:left-7 before:translateX-1/2 before:rotate-[135deg] before:z-10  before:bg-white before:border-white before:border-8 bg-white top-8 z-10 after:w-full after:h-6 after:absolute after:-top-5">
                <ul className="flex flex-col  py-5 w-72">
                  <li className=" p-3 hover:bg-slate-100">Pending</li>
                  <li className=" p-3 hover:bg-slate-100">Jobs</li>
                  <li className=" p-3 hover:bg-slate-100">Saved Jobs</li>
                </ul>
              </div>
            )}
          </div>
        </li>
        <li className=" flex align-items-center justify-center">
          <div
            className=" flex flex-row align-items-center justify-center relative"
            onMouseEnter={() => setDropdownVisible("2")}
            onMouseLeave={() => setDropdownVisible("0")}
          >
            <Link
              href="/user/business"
              className={clsx("hover:text-primary-600", {
                "text-primary-600": currentPath == "/user/business",
              })}
            >
              My Business
            </Link>
            {isDropdownVisible === "2" && (
              <div className="absolute text-black left-0 shadow-[0_0px_20px_rgba(228,228,228,1)] rounded-xl before:absolute before:-top-2 before:left-7 before:translateX-1/2 before:rotate-[135deg] before:z-10  before:bg-white before:border-white before:border-8 bg-white top-8 z-10 after:w-full after:h-6 after:absolute after:-top-5">
                <ul className="flex flex-col gap-3 py-5 w-72">
                  <li className=" p-3 hover:bg-slate-100">Payment History</li>
                  <li className=" p-3 hover:bg-slate-100">Transaction</li>
                  <li className=" p-3 hover:bg-slate-100">Saved Jobs</li>
                </ul>
              </div>
            )}
            <ChevronDownIcon className="h-5 w-5" />
          </div>
        </li>
        <li className="flex align-items-center justify-center">
          <Link
            href="/user/chatroom"
            className={clsx("hover:text-primary-600", {
              "text-primary-600": currentPath == "/user/chatroom",
            })}
          >
            Messages
          </Link>
        </li>
        <li className=" flex align-items-center justify-center">
          <Link
            href="/user/analytics" // Assuming this is the correct path for Analytics
            className={clsx("hover:text-primary-600", {
              "text-primary-600": currentPath == "/user/analytics",
            })}
          >
            Analytics
          </Link>
        </li>
      </ul>
    </>
  );
};

export default Links;
