"use client";

import React, { useEffect, useState } from "react";
import { users } from "../../lib/data.js"; // Adjust the path as necessary
import SearchChat from "./searchChat";
import Image from "next/image.js";

interface Props {
  name?: string;
}
interface user {
  id: number;
  name: string;
  message: string;
  time: string;
  image: string;
}

const ChatList = ({ name }: Props) => {
  const query = name || "";
  console.log(query);
  const [data, setData] = useState<user[]>([]); // Corrected the type to Job[] and initialized as an empty array

  useEffect(() => {
    let filteredData: user[] = []; // Temporary array to hold filtered data
    filteredData = users; // Initialize with all data
    if (query) {
      const queryWords = query.toLowerCase().split(/\s+/); // Split query into words or letters, and convert to lowercase for case-insensitive matching
      filteredData = filteredData.filter((user) =>
        queryWords.some((word) => user.name.toLowerCase().includes(word))
      );
    }

    setData(filteredData); // Update the state with the filtered data
  }, [query]);

  return (
    <div className="  h-full relative  overflow-hidden rounded-2xl  shadow-[0_10px_20px_rgba(228,228,228,_0.7)]  border-r-2 ">
      {/* <!-- search compt --> */}

      <div className="border-b-2  py-4 px-2">
        <SearchChat />
      </div>
      {/* <!-- end search compt --> */}

      {/* <!-- user list --> */}
      <div className=" h-full pb-16  overflow-scroll">
        <div className=" flex flex-col">
          {data.map((user) => (
            <div
              key={user.id}
              className="flex flex-row py-2 px-2 justify-center hover:bg-gray-200 items-center border-b-2"
            >
              {" "}
              {/* Moved key prop here */}
              <div className="w-1/4">
                <Image
                  src={user.image}
                  className="object-cover h-12 w-12 rounded-full"
                  alt=""
                  width={48}
                  height={48}
                />
              </div>
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

      {/* <!-- end user list --> */}
    </div>
  );
};

export default ChatList;
