"use client";

import { AtSymbolIcon, KeyIcon } from "@heroicons/react/24/outline";
import { Button } from "../button";
import { LifebuoyIcon, ShieldCheckIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (email === "" || password === "") {
      setError("Please fill in all fields");
      return;
    }

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (res?.error) {
        setError("Invalid Credentials");
        return;
      }

      router.replace("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form className="w-2/3" onSubmit={handleSubmit}>
        <div>
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="email"
            ></label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                type="email"
                name="email"
                placeholder="Email Address"
                onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        <Button
          className="mt-5 w-full
              justify-center text-white "
          // aria-disabled={isPending}
        >
          Continue
        </Button>
        {error && (
          <div className="bg-red-500 p-5 my-5 rounded-md">
            <p className="text-white text-sm">{error}</p>
          </div>
        )}

        <div className="flex justify-center  w-full items-center mt-3">
          <div className="before-line"></div>
          <p className="text-gray-500 text-center text-sm ">Or </p>
          <div className="after-line"></div>
        </div>
        <div className="relative  ">
          <Button
            className="mt-3 w-full
              justify-center text-white bg-blue-500"
            // aria-disabled={isPending}
          >
            Continue with Google
          </Button>
          <ShieldCheckIcon className="pointer-events-none absolute left-10 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-white peer-focus:text-gray-900" />
        </div>
        <div className="relative  ">
          <Button
            className="mt-3 w-full
              justify-center text-black bg-white 
              border-2 border-primary-600"
            // aria-disabled={isPending}
          >
            Continue with Github
          </Button>
          <LifebuoyIcon className="pointer-events-none absolute left-10 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-black peer-focus:text-gray-900" />
        </div>
      </form>
    </>
  );
};

export default LoginForm;
