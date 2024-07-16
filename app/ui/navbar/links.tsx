"use client";

import { ChevronDownIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import LinksDropdown from "./linksDropdown";

const Links = () => {
  const currentPath = usePathname();
  const [isDropdownVisible, setDropdownVisible] = useState(0);
  return (
    <>
      <ul className="lg:flex  mx-5 p-2 hidden font-medium text-sm gap-5 content-center items-center">
        <li>
          <div
            className=" flex flex-row align-items-center justify-center relative"
            onMouseEnter={() => setDropdownVisible(1)}
            onMouseLeave={() => setDropdownVisible(0)}
          >
            {currentPath.startsWith("/user") && (
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
            )}
            {currentPath.startsWith("/client") && (
              <Link
                href="/client"
                className={clsx("hover:text-primary-600", {
                  "text-primary-600":
                    currentPath == "/user/best-matches" ||
                    currentPath == "/user/most-recent" ||
                    currentPath == "/user/saved-jobs",
                })}
              >
                Dashboard
              </Link>
            )}
            <ChevronDownIcon className="h-5 w-5 ml-1" />
            {isDropdownVisible === 1 && (
              <LinksDropdown
                isDropdownVisible={isDropdownVisible}
                currentMode={currentPath}
              />
            )}
          </div>
        </li>
        <li className=" flex align-items-center justify-center">
          <div
            className=" flex flex-row align-items-center justify-center relative"
            onMouseEnter={() => setDropdownVisible(2)}
            onMouseLeave={() => setDropdownVisible(0)}
          >
            {currentPath.startsWith("/user") && (
              <Link
                href="/user/business"
                className={clsx("hover:text-primary-600", {
                  "text-primary-600": currentPath == "/user/business",
                })}
              >
                My Business
              </Link>
            )}

            {currentPath.startsWith("/client") && (
              <Link
                href="/client/talents"
                className={clsx("hover:text-primary-600", {
                  "text-primary-600": currentPath == "/client/talents",
                })}
              >
                Talents
              </Link>
            )}
            {isDropdownVisible === 2 && (
              <LinksDropdown
                isDropdownVisible={isDropdownVisible}
                currentMode={currentPath}
              />
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
