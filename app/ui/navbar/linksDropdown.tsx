import {
  UserCircleIcon,
  Cog6ToothIcon,
  ArrowLeftStartOnRectangleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";

interface Props {
  isDropdownVisible?: Number;
  isOpen?: Boolean;
  currentMode?: String;
}
const LinksDropdown = ({ isDropdownVisible, isOpen, currentMode }: Props) => {
  return (
    <>
      {isDropdownVisible === 1 && (
        <div className="absolute text-black left-0 shadow-[0_0px_20px_rgba(228,228,228,1)] rounded-xl before:absolute before:-top-2 before:left-7 before:translateX-1/2 before:rotate-[135deg] before:z-10  before:bg-white before:border-white before:border-8 bg-white top-8 z-10 after:w-full after:h-6 after:absolute after:-top-5">
          <ul className="flex flex-col  py-5 w-72">
            {currentMode?.startsWith("/user") && (
              <>
                <li className=" p-3 hover:bg-slate-100">Pending</li>
                <li className=" p-3 hover:bg-slate-100">Jobs</li>
                <li className=" p-3 hover:bg-slate-100">Saved Jobs</li>
              </>
            )}
            {currentMode?.startsWith("/client") && (
              <>
                <li className=" p-3 hover:bg-slate-100">Post Jobs</li>
                <li className=" p-3 hover:bg-slate-100">All Contracts</li>
                <li className=" p-3 hover:bg-slate-100">All Jobs Posts</li>
              </>
            )}
          </ul>
        </div>
      )}
      {isDropdownVisible === 2 && (
        <div className="absolute text-black left-0 shadow-[0_0px_20px_rgba(228,228,228,1)] rounded-xl before:absolute before:-top-2 before:left-7 before:translateX-1/2 before:rotate-[135deg] before:z-10  before:bg-white before:border-white before:border-8 bg-white top-8 z-10 after:w-full after:h-6 after:absolute after:-top-5">
          <ul className="flex flex-col gap-3 py-5 w-72">
            {currentMode?.startsWith("/user") && (
              <>
                <li className=" p-3 hover:bg-slate-100">Payment History</li>
                <li className=" p-3 hover:bg-slate-100">Transaction</li>
                <li className=" p-3 hover:bg-slate-100">Saved Jobs</li>
              </>
            )}

            {currentMode?.startsWith("/client") && (
              <>
                <li className=" p-3 hover:bg-slate-100">Discover</li>
                <li className=" p-3 hover:bg-slate-100">Your Hires </li>
                <li className=" p-3 hover:bg-slate-100">Recently Viewed</li>
                <li className=" p-3 hover:bg-slate-100">Saved Talents</li>
              </>
            )}
          </ul>
        </div>
      )}
      {isDropdownVisible === 3 && (
        <div className="absolute rounded-xl  p-2 bg-white text-xm right-0 top-10 shadow-[0_0px_20px_rgba(228,228,228,1)] before:absolute before:-top-1 before:right-2 before:translateX-1/2 before:rotate-[135deg] before:z-10  before:bg-white before:border-white before:border-8  z-10 after:right-0 after:h-6 after:absolute after:-top-5">
          Help
        </div>
      )}
      {isDropdownVisible === 4 && (
        <div className="absolute rounded-xl  p-2 bg-white text-xm right-0 top-10 shadow-[0_0px_20px_rgba(228,228,228,1)] before:absolute before:-top-1 before:right-2 before:translateX-1/2 before:rotate-[135deg] before:z-10  before:bg-white before:border-white before:border-8 after:right-0  z-10  after:h-6 after:absolute after:-top-5">
          Notification
        </div>
      )}
      {isDropdownVisible === 6 && !isOpen && (
        <div className="absolute rounded-xl w-[160px] p-2 bg-white text-xm right-0 top-10 shadow-[0_0px_20px_rgba(228,228,228,1)] before:absolute before:-top-1 before:right-2 before:translateX-1/2 before:rotate-[135deg] before:z-10  before:bg-white before:border-white before:border-8  z-10 after:w-full after:h-6 after:absolute after:-top-5">
          Account Settings
        </div>
      )}
      {isOpen && (
        <>
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
              <p className="text-xs  text-gray-400">
                {currentMode?.startsWith("/user") && <>Freelancer</>}
                {currentMode?.startsWith("/client") && <>Client</>}
              </p>
            </div>
          </div>
          <div className="hover:bg-slate-200 p-1">
            {currentMode?.startsWith("/user") && (
              <Link href={"/client"}>
                <span className="flex items-center gap-1">
                  <UserCircleIcon className="size-8" />
                  <span className="flex flex-col ">
                    <p>Susan Shrestha</p>
                    <p className="text-xs text-gray-400">Client</p>
                  </span>
                </span>
              </Link>
            )}
            {currentMode?.startsWith("/client") && (
              <Link href={"/user/best-matches"}>
                <span className="flex items-center gap-1">
                  <UserCircleIcon className="size-8" />
                  <span className="flex flex-col ">
                    <p>Susan Shrestha</p>
                    <p className="text-xs text-gray-400">Freelancer</p>
                  </span>
                </span>
              </Link>
            )}
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
            <span className="flex items-center gap-1">
              <ArrowLeftStartOnRectangleIcon className="size-8" />
              <span className="flex flex-col ">
                <Link href={"/login"}>
                  <p>Log out</p>
                </Link>
              </span>
            </span>
          </div>
        </>
      )}
    </>
  );
};

export default LinksDropdown;
