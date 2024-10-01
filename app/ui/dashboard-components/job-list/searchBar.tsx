"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const SearchInput = () => {
  const searchParams = useSearchParams(); // Retrieve search parameters from the URL
  const pathname = usePathname(); // Get the current path from the Next.js router
  const { replace } = useRouter(); // Function to replace the current URL

  // Function to handle search input and update the URL based on the search term
  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set("title", term); // Set the search term if provided
    } else {
      params.delete("title"); // Remove search param if the term is empty
    }
    const newUrl =
      pathname + (params.toString() ? `?${params.toString()}` : "");
    replace(newUrl); // Update the URL without refreshing the page
  };

  return (
    <form>
      <div className="relative">
        <label htmlFor="search"></label>
        <input
          type="search"
          name="search"
          placeholder="Search for jobs"
          className="w-full border-2 block bg-inherit rounded-full py-[8px] pl-10 outline-2 placeholder:text-gray-500 hover:border-primary-400"
          onChange={(e) => {
            handleSearch(e.target.value); // Trigger search when input changes
          }}
          defaultValue={searchParams.get("query")?.toString() || ""} // Set default value if there's an existing query
        />
        <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-1/2 h-[20px] w-[20px] -translate-y-1/2 text-black peer-focus:text-gray-900" />
      </div>
    </form>
  );
};

export default SearchInput;
