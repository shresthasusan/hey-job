"use client";

import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Button } from "../button";
import { useRouter } from "next/navigation";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const SignupForm = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();
  // const session = await getServerSession(authOptions);
  // if (session) redirect("/");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !lastName || !email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      const resUserExists = await fetch("/api/userExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const { user } = await resUserExists.json();

      if (user) {
        setError("User already exists");
        return;
      }
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          name,
          lastName,
          password,
        }),
      });
      if (res.ok) {
        const form = e.target as HTMLFormElement;
        form.reset();
        router.push("/login");
      }
      console.log("success");
    } catch (error) {
      console.error(error);
    }

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
          onChange={(e) => setEmail(e.target.value)}
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
            type="text"
            name="firstname"
            placeholder="First Name"
            onChange={(e) => setName(e.target.value)}
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
            type="text"
            name="lastname"
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
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

      {error && (
        <div className="bg-red-500 p-5 my-5 rounded-md">
          <p className="text-white text-sm">{error}</p>
        </div>
      )}
    </form>
  );
};

export default SignupForm;
