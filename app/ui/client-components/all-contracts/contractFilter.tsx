"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, FormEvent } from "react";
import { Button } from "../../button";

const ContractsFilter = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [filters, setFilters] = useState({
    search: searchParams.get("search") || "",
    contractType: searchParams.get("contractType") || "",
    status: searchParams.get("status") || "",
  });

  // Update URL when filter values change
  const updateURLParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    replace(`?${params.toString()}`);
  };

  useEffect(() => {
    setFilters({
      search: searchParams.get("search") || "",
      contractType: searchParams.get("contractType") || "",
      status: searchParams.get("status") || "",
    });
  }, [searchParams]);

  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    setFilters((prev) => {
      const params = new URLSearchParams(searchParams);

      if (key === "status") {
        let currentStatuses = new Set(prev.status.split(",").filter(Boolean));
        currentStatuses.has(value)
          ? currentStatuses.delete(value)
          : currentStatuses.add(value);

        const statusValue = Array.from(currentStatuses).join(",");
        statusValue
          ? params.set("status", statusValue)
          : params.delete("status");
        return { ...prev, status: statusValue };
      } else if (key === "contractType") {
        let currentTypes = new Set(
          prev.contractType.split(",").filter(Boolean)
        );
        currentTypes.has(value)
          ? currentTypes.delete(value)
          : currentTypes.add(value);

        params.delete("contractType");
        currentTypes.forEach((type) => params.append("contractType", type));
        return { ...prev, contractType: Array.from(currentTypes).join(",") };
      }
      return prev;
    });
  };

  const handleApplyFilters = () => {
    const queryString = Object.entries(filters)
      .filter(([_, value]) => value)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");

    replace(`${pathname}${queryString ? `?${queryString}` : ""}`);
    setIsFilterOpen(false);
  };

  const handleRemoveFilter = (key: keyof typeof filters) => {
    setFilters((prev) => {
      const updatedFilters = { ...prev, [key]: "" };
      const params = new URLSearchParams(searchParams.toString());
      params.delete(key);
      replace(`?${params.toString()}`);
      return updatedFilters;
    });
  };

  return (
    <div className="w-full">
      {/* Header with Search and Filter Button */}
      <div className="flex items-center gap-4 mb-4">
        <div className="relative flex items-center">
          <input
            id="search"
            type="text"
            value={filters.search}
            onChange={(e) => updateURLParams("search", e.target.value)}
            className="border rounded-lg px-10 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="Search contracts..."
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 absolute left-3 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
          aria-label="Toggle filters"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-primary-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>
          <span className="text-primary-500">Filters</span>
        </button>
      </div>

      {/* Filter Panel */}
      <div
        className={`w-full overflow-hidden transition-all duration-300 px-8 ease-in-out ${
          isFilterOpen ? "max-h-[400px]" : "max-h-0"
        }`}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleApplyFilters();
          }}
          className="flex flex-col md:flex-row gap-6 py-4"
        >
          {/* Contract Type */}
          <fieldset className="flex-1">
            <legend className="font-medium text-gray-700 mb-3">
              Contract Type
            </legend>
            <div className="space-y-3">
              {["fixed", "hourly"].map((type) => (
                <label key={type} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.contractType.split(",").includes(type)}
                    onChange={() => handleFilterChange("contractType", type)}
                    className="h-5 w-5 text-primary-500 border-primary-500 rounded"
                  />
                  <span className="ml-2 text-gray-600 capitalize">{type}</span>
                </label>
              ))}
            </div>
          </fieldset>

          {/* Contract Status */}
          <fieldset className="flex-1">
            <legend className="font-medium text-gray-700 mb-3">
              Contract Status
            </legend>
            <div className="space-y-3">
              {["pending", "active", "ended", "canceled", "rejected"].map(
                (status) => (
                  <label key={status} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.status.split(",").includes(status)}
                      onChange={() => handleFilterChange("status", status)}
                      className="h-5 w-5 text-primary-500 border-primary-500 rounded"
                    />
                    <span className="ml-2 text-gray-600 capitalize">
                      {status}
                    </span>
                  </label>
                )
              )}
            </div>
          </fieldset>

          {/* Apply Filters Button */}
          <div className="flex items-end">
            <Button
              type="submit"
              className="w-full md:w-auto text-white px-4 py-2 rounded-lg"
            >
              Apply Filters
            </Button>
          </div>
        </form>
      </div>

      {/* Applied Filters Section */}
      {filters.status || filters.contractType ? (
        <div className="mt-4 pt-3 border-t">
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            Applied Filters:
          </h4>
          <div className="flex flex-wrap gap-2">
            {filters.status
              .split(",")
              .filter(Boolean)
              .map((status) => (
                <span
                  key={status}
                  className="flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full"
                >
                  Status: {status.charAt(0).toUpperCase() + status.slice(1)}
                  <button
                    onClick={() => handleRemoveFilter("status")}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    ✕
                  </button>
                </span>
              ))}
            {filters.contractType
              .split(",")
              .filter(Boolean)
              .map((type) => (
                <span
                  key={type}
                  className="flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full"
                >
                  Contract: {type.charAt(0).toUpperCase() + type.slice(1)}
                  <button
                    onClick={() => handleRemoveFilter("contractType")}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    ✕
                  </button>
                </span>
              ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ContractsFilter;
