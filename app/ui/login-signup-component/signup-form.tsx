"use client";

import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Button } from "../button";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import clsx from "clsx";

const SignupForm = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(""); // Clear any previous errors
    setIsSubmitting(true);

    if (!name || !lastName || !email || !password) {
      setError("Please fill in all fields");
      setIsSubmitting(false);
      return;
    }
    if (password !== passwordConfirm) {
      setError("Passwords do not match");
      setIsSubmitting(false);
      return;
    }

    try {
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

      if (!res.ok) {
        const errorData = await res.json();
        setError(errorData.message || "Registration failed");
        setIsSubmitting(false);
        return;
      }

      const { userId } = await res.json(); // ✅ Extract `userId` from API response
      console.log("✅ Retrieved User ID:", userId);

      // Sign in the user after registration
      const response = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (response?.error) {
        setError(response.error);
        setIsSubmitting(false);
        return;
      }

      // ✅ Redirect user to profile upload page with `userId`
      router.push(`/signup/profile-upload/${userId}`);
      console.log("✅ Registration & Login Successful, Redirecting...");
    } catch (error) {
      console.error("Error during registration:", error);
      setError("An unexpected error occurred. Please try again.");
      setIsSubmitting(false);
    }
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
      <div>
        <label
          className="mb-3 mt-5 block text-xs font-medium text-gray-900"
          htmlFor="password"
        />
        <div className="relative">
          <input
            className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-5 text-sm outline-2 placeholder:text-gray-500"
            id="passwordConfirm"
            type="password"
            name="passwordConfirm"
            placeholder="Confirm Password"
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
        </div>
      </div>
      <Button
        type="submit"
        className={clsx("w-full text-white mt-5", {
          "bg-slate-100 border-2 border-primary-600 cursor-not-allowed":
            isSubmitting == true,
        })}
        disabled={isSubmitting}
      >
        {isSubmitting ? "please wait..." : "Sign up"}
      </Button>
      <button
        onClick={() => signIn("google")}
        className="w-full / bg-white  justify-center border-2 border-primary-600 text-primary-600 rounded-xl hover:bg-gray-50 mt-5 text-center p-2"
      >
        Sign in with Google
      </button>{" "}
      <br />
      <button
        onClick={() => signIn("github")}
        className="w-full / bg-white  justify-center border-2 border-primary-600 text-primary-600 rounded-xl hover:bg-gray-50 mt-5 text-center p-2"
      >
        Sign in with Github
      </button>
      {error && (
        <div className="bg-red-500 p-5 my-5 rounded-md">
          <p className="text-white text-sm">{error}</p>
        </div>
      )}
    </form>
  );
};

export default SignupForm;
