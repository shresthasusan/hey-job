import Image from "next/image";
import React, { Suspense } from "react";
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
import Links from "./links";
import NavSearchBar from "./navSearchBar";
import MenuBar from "./menuBar";

const NavBar = () => {
  return (
    <nav className="border-b-2 ">
      <div className="flex  max-w-[1980px] m-auto justify-between items-center  py-3 px-10">
        <div className="flex lg:hidden flex-col">
          <Suspense>
            <MenuBar />
          </Suspense>
        </div>
        <div className="flex">
          <Link href={"/"}>
            <Image
              src="/logo/login-logo.png"
              alt="logo"
              width={50}
              height={50}
              style={{ minBlockSize: "50px" }}
            />
          </Link>
          <Suspense>
            <Links />
          </Suspense>
        </div>
        <div className="flex items-center justify-end lg:w-[40%]">
          <NavSearchBar />
          <ul className="lg:flex gap-5 hidden  ml-2 items-center">
            <li>
              <QuestionMarkCircleIcon className="h-9 w-9" />
            </li>
            <li>
              <RectangleGroupIcon className="h-9 w-9" />
            </li>
            <li>
              <BellIcon className="h-9 w-9" />
            </li>
            <li>
              <UserCircleIcon className="h-9 w-9" />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
