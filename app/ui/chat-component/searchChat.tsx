"use client";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

const SearchChat: React.FC = () => {
  const searchParams = useSearchParams(); // Retrieves the current URL search parameters
  const pathname = usePathname(); // Gets the current path in the app
  const { replace } = useRouter(); // Router method to navigate or replace the current URL

  // Function to handle search input changes
  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams); // Clone current search params

    if (term) {
      params.set("name", term); // If search term exists, update the 'name' param
    } else {
      params.delete("name"); // If no search term, remove the 'name' param
    }

    const newUrl =
      pathname + (params.toString() ? `?${params.toString()}` : ""); // Construct new URL with updated params
    replace(newUrl); // Replace the current URL with the new one
  };

  return (
    <div>
      <input
        type="search"
        placeholder="Search messages"
        className="py-2 px-2 border-2 border-gray-200 hover:border-primary-400 rounded-2xl w-full"
        onChange={(e) => handleSearch(e.target.value)} // Handle input change
        defaultValue={searchParams.get("name")?.toString()} // Set default value if search param exists
      />
    </div>
  );
};

export default SearchChat;
