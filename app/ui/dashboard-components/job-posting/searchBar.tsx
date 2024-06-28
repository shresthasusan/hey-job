"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const SearchInput = () => {
  return (
    <form>
      <div className="relative ">
        <label htmlFor="search"></label>
        <input
          type="search"
          name="search"
          placeholder="Search for jobs"
          className=" w-full  border-2 block bg-inherit rounded-full py-[8px] pl-10  outline-2
                 placeholder:text-gray-500 "
        />
        <MagnifyingGlassIcon className="pointer-events-none  absolute left-3 top-1/2 h-[20px] w-[20px] -translate-y-1/2 text-black peer-focus:text-gray-900" />
      </div>
    </form>
  );
};

export default SearchInput;
