import Image from "next/image";
import React from "react";
import {
  BellIcon,
  ChevronDownIcon,
  MagnifyingGlassCircleIcon,
  MagnifyingGlassIcon,
  QuestionMarkCircleIcon,
  RectangleGroupIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

const NavBar = () => {
  return (
    <nav className="border-b-2 ">
      <div className="flex  max-w-[1980px] m-auto justify-between items-center  py-3 px-10">
        <div className="flex">
          <Image src="/logo/login-logo.png" alt="logo" width={50} height={50} />
          <ul className="flex mx-5 p-2 font-semibold text-sm gap-5 content-center items-center">
            <li className="hover:text-primary-600  flex align-items-center justify-center">
              Dashboard <ChevronDownIcon className="h-5 w-5 ml-1" />
            </li>
            <li className="hover:text-primary-600 flex align-items-center justify-center">
              My Business <ChevronDownIcon className="h-5 w-5" />
            </li>
            <li className="hover:text-primary-600 flex align-items-center justify-center">
              <Link href={"/user/chatroom"}>Messages</Link>{" "}
              <ChevronDownIcon className="h-5 w-5" />
            </li>
            <li className="hover:text-primary-600 flex align-items-center justify-center">
              Analytics <ChevronDownIcon className="h-5 w-5" />
            </li>
          </ul>
        </div>
        <div className="flex justify-end w-[40%]">
          <form
            className=" flex items-center divide-x rounded-full border-2 border-slate-200  gap-1 hover:bg-slate-200
        "
          >
            <div className="relative">
              <label htmlFor="search"></label>
              <input
                type="search"
                name="search"
                placeholder="Search"
                className="  w-full block bg-inherit rounded-full py-[8px] pl-10  outline-2
                 placeholder:text-gray-500 "
              />
              <MagnifyingGlassIcon className="pointer-events-none  absolute left-3 top-1/2 h-[20px] w-[20px] -translate-y-1/2 text-black peer-focus:text-gray-900" />
            </div>
            <div>
              <label htmlFor="search"></label>
              <select
                name="jobs"
                id="job"
                className=" w-full block  rounded-full py-[10px] pl-5 bg-inherit hover:bg-white outline-2 placeholder:text-gray-500 "
              >
                <option value="job">Jobs</option>
                <option value="Projects">Projects</option>
                <option value="Talents">Talents</option>
              </select>
            </div>
          </form>
          <ul className="flex gap-5  ml-2 items-center">
            <li>
              <QuestionMarkCircleIcon className="h-10 w-10" />
            </li>
            <li>
              <RectangleGroupIcon className="h-10 w-10" />
            </li>
            <li>
              <BellIcon className="h-10 w-10" />
            </li>
            <li>
              <UserCircleIcon className="h-10 w-10" />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
