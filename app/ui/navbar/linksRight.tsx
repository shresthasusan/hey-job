"use client";
import Image from "next/image";
import {
  QuestionMarkCircleIcon,
  RectangleGroupIcon,
  BellIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  ArrowLeftCircleIcon,
  ArrowLeftStartOnRectangleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const LinksRight = () => {
  const [isDropdownVisible, setDropdownVisible] = useState("0");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = () => {
      setIsOpen(false);
    };
    // Step 1: Query for elements with the 'body-container' class
    const elements = document.querySelectorAll(".body-container");

    // Step 2: Add the event listener to each of these elements
    elements.forEach((element) => {
      element.addEventListener("mousedown", handleClickOutside);
    });

    // Step 3: Remove the event listener from each element on cleanup
    return () => {
      elements.forEach((element) => {
        element.removeEventListener("mousedown", handleClickOutside);
      });
    };
  }, []);
  return (
    <ul className="lg:flex gap-5 hidden  ml-2 items-center">
      <li
        onMouseEnter={() => setDropdownVisible("3")}
        onMouseLeave={() => setDropdownVisible("0")}
        className="relative"
      >
        <QuestionMarkCircleIcon className="h-9 w-9 " />
        {isDropdownVisible === "3" && (
          <div className="absolute rounded-xl  p-2 bg-white text-xm right-0 top-10 shadow-[0_0px_20px_rgba(228,228,228,1)] before:absolute before:-top-1 before:right-2 before:translateX-1/2 before:rotate-[135deg] before:z-10  before:bg-white before:border-white before:border-8  z-10 after:w-full after:h-6 after:absolute after:-top-5">
            Help
          </div>
        )}
      </li>

      <li>
        <RectangleGroupIcon className="h-9 w-9" />
      </li>
      <li
        onMouseEnter={() => setDropdownVisible("4")}
        onMouseLeave={() => setDropdownVisible("0")}
        className="relative"
      >
        <BellIcon className="h-9 w-9" />
        {isDropdownVisible === "4" && (
          <div className="absolute rounded-xl  p-2 bg-white text-xm right-0 top-10 shadow-[0_0px_20px_rgba(228,228,228,1)] before:absolute before:-top-1 before:right-2 before:translateX-1/2 before:rotate-[135deg] before:z-10  before:bg-white before:border-white before:border-8  z-10 after:w-full after:h-6 after:absolute after:-top-5">
            Notification
          </div>
        )}
      </li>
      <li>
        <div
          onMouseEnter={() => setDropdownVisible("6")}
          onMouseLeave={() => setDropdownVisible("0")}
          className="relative"
        >
          <UserCircleIcon
            className="h-9 w-9"
            onClick={() => setIsOpen(!isOpen)}
          />
          {isOpen && (
            <div
              ref={dropdownRef}
              className="absolute w-[250px] py-2 text-black right-0 shadow-[0_0px_20px_rgba(228,228,228,1)] rounded-xl before:absolute before:-top-1 before:right-2 before:translateX-1/2 before:rotate-[135deg] before:z-10  before:bg-white before:border-white before:border-8 bg-white top-11 z-10 after:w-full after:h-6 after:absolute after:-top-5"
            >
              <div className="p-3 flex   flex-col relative overflow-hidden  align-middle items-center ">
                <div
                  className="bg-yellow-400  rounded-full
              
           h-24 w-24"
                >
                  <Image
                    src="/images/image1.png"
                    alt="profile"
                    width={150}
                    height={150}
                    className="rounded-full "
                  />
                </div>

                <div className=" text-center pt-1 ">
                  <h2 className="text-2xl  font-medium "> Rabin Yadav</h2>
                  <p className="text-xs  text-gray-400">Freelancer</p>
                </div>
              </div>
              <div className="hover:bg-slate-200 p-1">
                <Link href={"/client"}>
                  <span className="flex items-center gap-1">
                    <UserCircleIcon className="size-8" />
                    <span className="flex flex-col ">
                      <p>Susan Shrestha</p>
                      <p className="text-xs text-gray-400">Client</p>
                    </span>
                  </span>
                </Link>
              </div>
              <div className="hover:bg-slate-200 p-1">
                <Link href={"/client"}>
                  <span className="flex items-center gap-1">
                    <UserCircleIcon className="size-8" />
                    <span className="flex flex-col ">
                      <p>Profile</p>
                    </span>
                  </span>
                </Link>
              </div>
              <div className="hover:bg-slate-200 p-1">
                <Link href={"/client"}>
                  <span className="flex items-center gap-1">
                    <Cog6ToothIcon className="size-8" />
                    <span className="flex flex-col ">
                      <p>Settings</p>
                    </span>
                  </span>
                </Link>
              </div>{" "}
              <div className="hover:bg-slate-200 p-1">
                <Link href={"/client"}>
                  <span className="flex items-center gap-1">
                    <ArrowLeftStartOnRectangleIcon className="size-8" />
                    <span className="flex flex-col ">
                      <Link href={"/login"}>
                        <p>Log out</p>
                      </Link>
                    </span>
                  </span>
                </Link>
              </div>
            </div>
          )}
          {isDropdownVisible === "6" && (
            <div className="absolute rounded-xl w-[160px] p-2 bg-white text-xm right-0 top-10 shadow-[0_0px_20px_rgba(228,228,228,1)] before:absolute before:-top-1 before:right-2 before:translateX-1/2 before:rotate-[135deg] before:z-10  before:bg-white before:border-white before:border-8  z-10 after:w-full after:h-6 after:absolute after:-top-5">
              Account Settings
            </div>
          )}
        </div>
      </li>
    </ul>
  );
};

export default LinksRight;
