"use client";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

import React from "react";

const SearchChat = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set("name", term);
    } else {
      params.delete("name");
    }
    const newUrl =
      pathname + (params.toString() ? `?${params.toString()}` : "");
    replace(newUrl);
  };
  return (
    <div>
      <input
        type="search "
        placeholder="search messages "
        className="py-2 px-2 border-2 border-gray-200  hover:border-primary-400 rounded-2xl w-full"
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
      />
    </div>
  );
};

export default SearchChat;
