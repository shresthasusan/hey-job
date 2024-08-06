"use client";

import { AtSymbolIcon } from "@heroicons/react/16/solid";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import React from "react";
import { Button } from "../button";
import { redirect } from "next/dist/server/api-utils";
import router from "next/router";

const SignupForm = () => {
  const handleSubmit = () => {
    console.log("submitted");
  };

  return (
    <form className="w-2/3" onSubmit={handleSubmit}>
      <div className="relative mt-5">
        <input
          className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
          id="email"
          type="email"
          name="email"
          placeholder="Email Address"
          // required
        />
        <EnvelopeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
      </div>
      <div>
        <label
          className="mb-3 mt-5 block text-xs font-medium text-gray-900"
          htmlFor="firstname"
        ></label>
        <div className="relative">
          <input
            className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-5 text-sm outline-2 placeholder:text-gray-500"
            id="firstname"
            type="firstname"
            name="firstname"
            placeholder="First Name"
            // required
          />
        </div>
      </div>
      <div>
        <label
          className="mb-3n  mt-5 block text-xs font-medium text-gray-900"
          htmlFor="lastname"
        ></label>
        <div className="relative">
          <input
            className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-5 text-sm outline-2 placeholder:text-gray-500"
            id="lastname"
            type="lastname"
            name="lastname"
            placeholder="Last Name"
            // required
          />
        </div>
      </div>
      <div>
        <label
          className="mb-3 mt-5 block text-xs font-medium text-gray-900"
          htmlFor="password"
        />
        <div className="relative">
          <input
            className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-5 text-sm outline-2 placeholder:text-gray-500"
            id="password"
            type="password"
            name="password"
            placeholder="Password"
            // required
          />
        </div>
      </div>
      <Button
        className="mt-5 w-full
                  justify-center text-white "
        type="submit"
      >
        Create my account
      </Button>
    </form>
  );
};

export default SignupForm;
