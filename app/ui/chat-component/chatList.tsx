"use client";

import React, { useEffect, useState } from "react";
import { users } from "../../lib/data"; // Adjust the path as necessary
import SearchChat from "./searchChat";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

// Define the interface for the user type
interface User {
  id: number;
  name: string;
  message: string;
  time: string;
  image: string;
}

const ChatList: React.FC = () => {
  const searchParam = useSearchParams(); // Get search parameters from the URL
  const query = searchParam.get("name"); // Get the "name" query parameter
  const [data, setData] = useState<User[]>([]); // State to hold filtered user data

  useEffect(() => {
    let filteredData: User[] = users; // Initialize with all user data

    // Filter the data if a query is present
    if (query) {
      const queryWords = query.toLowerCase().split(/\s+/); // Convert query to lowercase and split into words
      filteredData = filteredData.filter((user) =>
        queryWords.some((word) => user.name.toLowerCase().includes(word))
      );
    }

    setData(filteredData); // Update state with filtered data
  }, [query]); // Dependency on 'query' to re-run filter logic when query changes

  return (
    <div className="h-full relative overflow-hidden rounded-2xl shadow-[0_10px_20px_rgba(228,228,228,_0.7)] border-r-2">
      {/* Search component */}
      <div className="border-b-2 py-4 px-2">
        <SearchChat />
      </div>

      {/* User list */}
      <div className="h-full pb-16 overflow-scroll">
        <div className="flex flex-col">
          {data.map((user) => (
            <div
              key={user.id} // Key prop for mapping
              className="flex flex-row py-2 px-2 justify-center hover:bg-gray-200 items-center border-b-2"
            >
              {/* User avatar */}
              <div className="w-1/4">
                <Image
                  src={user.image}
                  className="object-cover h-12 w-12 rounded-full"
                  alt={user.name}
                  width={48}
                  height={48}
                />
              </div>

              {/* User details */}
              <div className="w-[80%] relative">
                <div className="text-lg font-medium">{user.name}</div>
                <div className="text-sm w-[80%] overflow-hidden text-gray-500">
                  {user.message}
                </div>
                <span className="absolute text-[.7rem] right-0 bottom-0 text-gray-500">
                  {user.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatList;
