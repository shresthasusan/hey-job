"use client";

import { ChevronDownIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface Props {
  isOpen: boolean;
}

const Links = () => {
  const currentPath = usePathname();
  console.log(currentPath);
  return (
    <>
      <ul className="lg:flex  mx-5 p-2 hidden font-medium text-sm gap-5 content-center items-center">
        <li className="hover:text-primary-600 flex flex-row align-items-center justify-center">
          <Link
            href="/user/best-matches"
            className={clsx({
              "text-primary-600":
                currentPath == "/user/best-matches" ||
                currentPath == "/user/most-recent" ||
                currentPath == "/user/saved-jobs",
            })}
          >
            Dashboard
          </Link>
          <ChevronDownIcon className="h-5 w-5 ml-1" />
        </li>
        <li className="hover:text-primary-600 flex align-items-center justify-center">
          <Link
            href="/user/business"
            className={clsx({
              "text-primary-600": currentPath == "/user/business",
            })}
          >
            My Business
          </Link>
          <ChevronDownIcon className="h-5 w-5" />
        </li>
        <li className="hover:text-primary-600 flex align-items-center justify-center">
          <Link
            href="/user/chatroom"
            className={clsx({
              "text-primary-600": currentPath == "/user/chatroom",
            })}
          >
            Messages
          </Link>
          <ChevronDownIcon className="h-5 w-5" />
        </li>
        <li className="hover:text-primary-600 flex align-items-center justify-center">
          <Link
            href="/user/analytics" // Assuming this is the correct path for Analytics
            className={clsx({
              "text-primary-600": currentPath == "/user/analytics",
            })}
          >
            Analytics
          </Link>
          <ChevronDownIcon className="h-5 w-5" />
        </li>
      </ul>
    </>
  );
};

export default Links;
