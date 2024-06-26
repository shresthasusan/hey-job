"use client";

import { poppins } from "@/app/ui/fonts";
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { Button } from "@/app/ui/button";
import { error } from "console";
// import { useFormState } from 'react-dom';
// import { authenticate } from '@/app/lib/actions';

export default function LoginForm() {
  //   const [errorMessage, formAction, isPending] = useFormState(
  //     authenticate,
  //     undefined,
  //     () => {}
  //   );

  return (
    <form className="space-y-3 ">
      <div className="flex-1 justify-items-center w-[300px] text-center align-items-center    border-yellow-500  pb-4 pt-8">
        <h1
          className={`${poppins.className} text-gray-700 font-bold mb-3 text-2xl`}
        >
          Log in to HeyJob
        </h1>
        <div>
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="username"
            ></label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="username"
                type="username"
                name="username"
                placeholder="Username"
                required
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="password"
            ></label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                placeholder="Password"
                required
                minLength={6}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        <Button
          className="mt-5 w-full
          justify-center text-white hover:bg-primary-500"
          // aria-disabled={isPending}
        >
          Continue
        </Button>
        <div className="relative flex py-5 items-center">
          <div className="flex-grow border-t border-gray-400"></div>

          <p> Don&apos;t have a HeyJob account?</p>
          <div className="flex-grow border-t border-gray-400"></div>
        </div>

        <Button
          className=" w-full bg-white justify-center
        border-2 border-primary-600
        text-primary-600 hover:bg-gray-50 "
        >
          Signup
        </Button>
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {/* {errorMessage && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{error}</p>
            </>
          )} */}
        </div>
      </div>
    </form>
  );
}
