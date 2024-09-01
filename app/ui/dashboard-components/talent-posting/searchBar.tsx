"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useSearchParams, usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

const SearchBar = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set("talentName", term);
    } else {
      params.delete("talentName");
    }
    const newUrl =
      pathname + (params.toString() ? `?${params.toString()}` : "");
    replace(newUrl);
  };
  return (
    <form>
      <div className="relative ">
        <label htmlFor="search"></label>
        <input
          type="search"
          name="search"
          placeholder="Search for Talents"
          className=" w-full  border-2 block bg-inherit rounded-full py-[8px] pl-10  outline-2
                 placeholder:text-gray-500 hover:border-primary-400 "
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
          defaultValue={searchParams.get("query")?.toString()}
        />
        <MagnifyingGlassIcon className="pointer-events-none  absolute left-3 top-1/2 h-[20px] w-[20px] -translate-y-1/2 text-black peer-focus:text-gray-900" />
      </div>
    </form>
  );
};

export default SearchBar;
